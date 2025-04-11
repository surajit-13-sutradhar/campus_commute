import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const searchVehicles = async (req, res) => {
    const { start, end, time } = req.query;
    if (!start || !end || !time) {
      return res.status(400).json({ error: "start, end, and time are required" });
    }
  
    try {
        const desiredTime = new Date(time);
    
        // Fetch matching buses
        const buses = await prisma.vehicle.findMany({
            where: {
            type: "BUS",
            available: true,
            departure: { gte: desiredTime },
            route: {
                contains: start,
                mode: "insensitive"
            }
            }
        });
    
        // Filter buses where route includes start -> end in correct order
        const validBuses = buses.filter((bus) => {
            const routePoints = bus.route.split("-");
            const startIdx = routePoints.indexOf(start);
            const endIdx = routePoints.indexOf(end);
            return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
        });
    
        // Fetch all available autos
        const autos = await prisma.vehicle.findMany({
            where: {
            type: "AUTO",
            available: true
            }
        });
    
        res.json({
            buses: validBuses,
            autos
        });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Vehicle search failed" });
        }
};
