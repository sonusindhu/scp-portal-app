import { prisma } from '../../config/database.js';

export class UserRepository {
  async findById(id: number, includePassword = false) {
    const select = {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      fullName: true,
      isSuperAdmin: true,
      isAdmin: true,
      userImage: true,
      jobTitle: true,
      department: true,
      location: true,
      phoneNumber: true,
      extension: true,
      createdAt: true,
      updatedAt: true,
      ...(includePassword ? { password: true } : {}),
    } satisfies Record<string, boolean>;

    return prisma.user.findUnique({
      where: { id },
      select,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    jobTitle?: string | null;
    department?: string | null;
    location?: string | null;
    phoneNumber?: string | null;
    extension?: string | null;
    userImage?: string | null;
    password?: string;
  }) {
    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        fullName: true,
        jobTitle: true,
        department: true,
        location: true,
        phoneNumber: true,
        extension: true,
        userImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    return prisma.user.update({
      where: { id },
      data: { password },
    });
  }
}
