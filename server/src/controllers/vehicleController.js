import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const searchVehicles = async (req, res) => {
    const { start, end, time } = req.query;

    if (!start || !end || !time) {
        return res.status(400).json({ error: "start, end, and time are required" });
    }

    try {
        const desiredTime = new Date(time);

        // Fetch all available buses departing after the desired time
        const buses = await prisma.vehicle.findMany({
            where: {
                type: "BUS",
                available: true,
                departure: {
                    gte: desiredTime
                }
            }
        });

        // Filter buses where the route contains start → end in correct order
        const matchedBuses = buses
            .filter((bus) => {
                if (!bus.route) return false;
                const stops = bus.route.split("-");
                const startIdx = stops.indexOf(start);
                const endIdx = stops.indexOf(end);
                return startIdx !== -1 && endIdx !== -1 && startIdx < endIdx;
            })
            .sort((a, b) => new Date(a.departure) - new Date(b.departure))
            .slice(0, 3); // take top 3

        // Fetch all available autos (no time restriction)
        const autos = await prisma.vehicle.findMany({
            where: {
                type: "AUTO",
                available: true
            }
        });

        // Fetch all available cycles (no time or route restrictions)
        const cycles = await prisma.vehicle.findMany({
            where: {
                type: "CYCLE",
                available: true
            },
            orderBy: {
                name: 'asc' // Order cycles by name
            }
        });

        console.log('Found vehicles:', {
            buses: matchedBuses.length,
            autos: autos.length,
            cycles: cycles.length
        });

        res.json({
            buses: matchedBuses,
            autos,
            cycles
        });
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: "Vehicle search failed", details: err.message });
    }
};
