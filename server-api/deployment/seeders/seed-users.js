import bcrypt from 'bcryptjs';
import { prisma } from '../../src/config/database.js';
import { logger } from '../../src/config/logger.js';
const seedUsersData = [
    {
        email: 'admin@scp.local',
        password: 'Admin@123',
        firstName: 'System',
        lastName: 'Admin',
    },
    {
        email: 'demo@scp.local',
        password: 'Demo@123',
        firstName: 'Demo',
        lastName: 'User',
    },
];
export async function seedUsers() {
    const created = [];
    const skipped = [];
    for (const user of seedUsersData) {
        const existing = await prisma.user.findUnique({
            where: { email: user.email },
        });
        if (existing) {
            skipped.push(user.email);
            continue;
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: `${user.firstName} ${user.lastName}`,
            },
        });
        created.push(user.email);
    }
    logger.info(`Seeded users: created=${created.length}, skipped=${skipped.length}`);
    return { created: created.length, skipped: skipped.length };
}
if (process.argv.includes('--run')) {
    seedUsers()
        .then((result) => {
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
    })
        .catch((error) => {
        logger.error('User seeding failed');
        console.error(error);
        process.exit(1);
    });
}
