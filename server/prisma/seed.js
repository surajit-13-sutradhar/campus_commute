import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        // Delete existing data in the correct order to respect foreign key constraints
        await prisma.booking.deleteMany();
        await prisma.bulkBooking.deleteMany();
        await prisma.vehicle.deleteMany();
        await prisma.user.deleteMany();

        const routes = [
            { name: "Campus Bus 1", route: "A-B-C-D-E" },
            { name: "Campus Bus 2", route: "F-G-H-I-J" },
            { name: "Campus Bus 3", route: "A-C-E-G-I" }
        ];

        const buses = [];

        const now = new Date();
        const daysToGenerate = 7;
        const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22]; // 2-hour interval

        for (let d = 0; d < daysToGenerate; d++) {
            for (let h of hours) {
                for (let r = 0; r < routes.length; r++) {
                    const departure = new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() + d,
                        h
                    );

                    buses.push({
                        name: `${routes[r].name} - ${h}:00`,
                        type: "BUS",
                        route: routes[r].route,
                        departure,
                        available: true,
                    });
                }
            }
        }

        console.log('Creating buses...');
        await prisma.vehicle.createMany({ data: buses });
        console.log(`Created ${buses.length} buses`);

        // Create autos
        const autos = [
            { name: "Auto 1", type: "AUTO", available: true },
            { name: "Auto 2", type: "AUTO", available: true },
            { name: "Auto 3", type: "AUTO", available: true },
        ];

        console.log('Creating autos...');
        await prisma.vehicle.createMany({ data: autos });
        console.log('Created 3 autos');

        // Create cycles
        const cycles = [
            { name: "Cycle 101", type: "CYCLE", available: true },
            { name: "Cycle 102", type: "CYCLE", available: true },
            { name: "Cycle 103", type: "CYCLE", available: true }
        ];

        console.log('Creating cycles...');
        await prisma.vehicle.createMany({ data: cycles });
        console.log('Created 3 cycles');

        console.log('Seeding completed successfully!');
        console.log(`Total vehicles created: ${buses.length + autos.length + cycles.length}`);
        
    } catch (error) {
        console.error('Seeding failed with error:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((err) => {
        console.error("Seeding failed:", err);
        process.exit(1);
    });
