import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const createBooking = async (req, res) => {
    const {vehicleId, type} = req.body
    const userId = req.user.id

    try {
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle || !vehicle.available) {
            return res.status(400).json({ error: "Invalid or unavailable vehicle" });
        }
    
        if (vehicle.type === "BUS") {
            const existing = await prisma.booking.findFirst({
                where: { userId, vehicleId, type: "BOOKING" }
            });
            if (existing) {
                return res.status(400).json({ error: "Already booked this bus" });
            }
        }
    
        // Create booking with CONFIRMED status
        await prisma.booking.create({
            data: {
                userId,
                vehicleId,
                type: vehicle.type === "BUS" ? "BOOKING" : "AUTO",
                status: "CONFIRMED" // Set status as CONFIRMED
            }
        });
    
        // For autos, mark unavailable after booking
        if (vehicle.type === "AUTO") {
          await prisma.vehicle.update({
            where: { id: vehicleId },
            data: { available: false }
          });
        }
    
        res.status(201).json({ message: "Booking successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Booking failed" });
    }
}

const getUserBookings = async (req, res) => {
    const userId = req.user.id;

    try {
        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {
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
        console.error('Error fetching user bookings:', err);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
}

export { createBooking, getUserBookings }