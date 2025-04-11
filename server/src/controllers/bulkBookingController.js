import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const createBulkBooking = async (req, res) => {
    const { departureDateTime, numberOfBuses, numberOfStudents, reason } = req.body;
    const userId = req.user.id;

    try {
        // Validate input
        if (!departureDateTime || !numberOfBuses || !numberOfStudents || !reason) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Ensure numbers are integers
        const numBuses = parseInt(numberOfBuses, 10);
        const numStudents = parseInt(numberOfStudents, 10);

        if (isNaN(numBuses) || isNaN(numStudents)) {
            return res.status(400).json({ error: "Number of buses and students must be valid numbers" });
        }

        if (numBuses < 1 || numStudents < 1) {
            return res.status(400).json({ error: "Number of buses and students must be greater than 0" });
        }

        // Check if user is authorized (CLUB_SECY or FACULTY)
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user.role !== "CLUB_SECY" && user.role !== "FACULTY") {
            return res.status(403).json({ error: "Only club secretaries and faculty can make bulk bookings" });
        }

        // Create bulk booking
        const bulkBooking = await prisma.bulkBooking.create({
            data: {
                userId,
                departure: departureDateTime,
                numberOfBuses: numBuses,
                numberOfStudents: numStudents,
                reason,
                status: "APPROVED" // Auto-approve for demo
            }
        });

        // Create individual bookings for each bus
        const buses = await prisma.vehicle.findMany({
            where: {
                type: "BUS",
                available: true
            },
            take: numBuses
        });

        if (buses.length < numBuses) {
            return res.status(400).json({ error: "Not enough buses available" });
        }

        // Update buses with departure time, mark as unavailable, and link to bulk booking
        await Promise.all(buses.map(bus => 
            prisma.vehicle.update({
                where: { id: bus.id },
                data: {
                    departure: departureDateTime,
                    available: false,
                    bulkBookingId: bulkBooking.id
                }
            })
        ));

        // Create individual bookings
        await Promise.all(buses.map(bus =>
            prisma.booking.create({
                data: {
                    userId,
                    vehicleId: bus.id,
                    type: "BOOKING"
                }
            })
        ));

        res.status(201).json({
            message: "Bulk booking created successfully",
            bulkBooking
        });
    } catch (err) {
        console.error('Bulk booking error:', err);
        res.status(500).json({ error: "Failed to create bulk booking", details: err.message });
    }
}

const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                vehicle: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        route: true,
                        departure: true,
                        available: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ error: "Failed to fetch bookings", details: err.message });
    }
}

const getUserBulkBookings = async (req, res) => {
    const userId = req.user.id;

    try {
        const bulkBookings = await prisma.bulkBooking.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                vehicles: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        route: true,
                        departure: true,
                        available: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(bulkBookings);
    } catch (err) {
        console.error('Error fetching bulk bookings:', err);
        res.status(500).json({ error: "Failed to fetch bulk bookings", details: err.message });
    }
}

export { createBulkBooking, getUserBulkBookings, getBookings } 