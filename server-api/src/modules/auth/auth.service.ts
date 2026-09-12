import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import { env } from '../../config/env.js';
import { AppError } from '../../common/errors/AppError.js';
import { AuthRepository } from './auth.repository.js';

export class AuthService {
  constructor(private readonly authRepository = new AuthRepository()) {}

  generateToken(userId: number) {
    return jwt.sign({ id: userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Please enter valid email/password', 401);
    }

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) {
      throw new AppError('Please enter valid email/password', 401);
    }

    return user;
  }

  async signup(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
  }) {
    if (payload.password !== payload.confirmPassword) {
      throw new AppError('Password and confirm password do not match', 400);
    }

    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new AppError('Email address is already taken', 409);
    }

    const hashedPassword = await this.hashPassword(payload.password);

    return this.authRepository.createUser({
      email: payload.email,
      password: hashedPassword,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: `${payload.firstName} ${payload.lastName}`,
    });
  }

  async requestPasswordReset(email: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return { message: 'Please check your email for the password reset link.' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60 * 60 * 1000;

    await this.authRepository.updateUserPasswordResetToken(user.id, token, expiresAt);

    return {
      message: 'Please check your email for the password reset link.',
      token,
    };
  }

  async resetPassword(payload: { token: string; password: string; confirmPassword: string }) {
    if (payload.password !== payload.confirmPassword) {
      throw new AppError('Password and confirm password do not match', 400);
    }

    const user = await this.authRepository.findByResetToken(payload.token);

    if (!user || !user.passwordResetTokenExpiresAt || user.passwordResetTokenExpiresAt <= Date.now()) {
      throw new AppError('Password token has been invalid/expired.', 400);
    }

    const hashedPassword = await this.hashPassword(payload.password);
    await this.authRepository.resetPasswordWithToken(user.id, hashedPassword);

    return {
      message: 'Password has been reset successfully.',
    };
  }
}
