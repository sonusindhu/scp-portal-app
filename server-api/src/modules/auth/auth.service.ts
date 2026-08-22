import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { env } from '../../config/env.js';

export class AuthService {
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
}
