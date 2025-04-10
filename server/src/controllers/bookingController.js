import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

exports.createBooking = async (req, res) => {
    const {vehicleId, type} = req.body
    const userId = req.user.id

    try {
        const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle || !vehicle.available || vehicle.type !== type) {
            return res.status(400).json({ error: "Invalid or unavailable vehicle" });
        }
    
        if (type === "BUS") {
            const existing = await prisma.booking.findFirst({
                where: { userId, vehicleId, type: "BUS" }
            });
            if (existing) {
                return res.status(400).json({ error: "Already booked this bus" });
            }
        }
    
        // Create booking
        await prisma.booking.create({
            data: {
                userId,
                vehicleId,
                type
            }
        });
    
        // For autos, mark unavailable after booking
        if (type === "AUTO") {
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