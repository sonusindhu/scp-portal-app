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

  async findByResetToken(token: string) {
    return prisma.user.findFirst({
      where: {
        passwordResetToken: token,
      },
    });
  }

  async updateUserPasswordResetToken(userId: number, token: string, expiresAt: number) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expiresAt,
      },
    });
  }

  async resetPasswordWithToken(userId: number, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
      },
    });
  }
}
