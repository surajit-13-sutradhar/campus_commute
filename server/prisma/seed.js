import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.vehicle.deleteMany();

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

    await prisma.vehicle.createMany({ data: buses });

    // Seed 3 autos
    await prisma.vehicle.createMany({
        data: [
            { name: "Auto 1", type: "AUTO", available: true },
            { name: "Auto 2", type: "AUTO", available: true },
            { name: "Auto 3", type: "AUTO", available: true },
        ],
    });

    console.log(`Seeded ${buses.length} buses & 3 autos.`);
}

main()
    .catch((err) => {
        console.error("Seeding failed:", err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
