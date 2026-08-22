import { prisma } from '../../config/database.js';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}
