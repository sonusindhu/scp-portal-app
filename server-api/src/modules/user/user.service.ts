import bcrypt from 'bcryptjs';
import fs from 'node:fs/promises';
import path from 'node:path';

import { AppError } from '../../common/errors/AppError.js';
import { UserRepository } from './user.repository.js';
import type { UserPasswordPayload, UserProfilePayload } from './user.types.js';

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async getCurrentUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateProfile(id: number, payload: UserProfilePayload) {
    const currentUser = await this.userRepository.findById(id);
    if (!currentUser) {
      throw new AppError('User not found', 404);
    }

    const nextProfile = {
      ...payload,
      ...(payload.firstName || payload.lastName
        ? {
            fullName: `${payload.firstName ?? currentUser.firstName} ${payload.lastName ?? currentUser.lastName}`,
          }
        : {}),
    };

    return this.userRepository.update(id, nextProfile);
  }

  async updatePassword(id: number, payload: UserPasswordPayload) {
    const user = await this.userRepository.findById(id, true);
    if (!user || !user.password) {
      throw new AppError('User not found', 404);
    }

    if (payload.password !== payload.confirmPassword) {
      throw new AppError('Password and confirm password do not match', 400);
    }

    const isMatch = await bcrypt.compare(payload.currentPassword, user.password);
    if (!isMatch) {
      throw new AppError('Please enter a valid current password', 400);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    await this.userRepository.updatePassword(id, hashedPassword);

    return { success: true };
  }

  async uploadProfileImage(id: number, preview: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const matches = preview.match(/^data:image\/(png|jpeg|jpg|gif|bmp);base64,(.+)$/i);
    if (!matches) {
      throw new AppError('Invalid image format', 400);
    }

    const imageType = matches[1].toLowerCase();
    const base64Data = matches[2];
    const fileName = `user-${id}-${Date.now()}.${imageType === 'jpg' ? 'jpg' : imageType === 'jpeg' ? 'jpeg' : imageType}`;
    const uploadDir = path.resolve(process.cwd(), 'assets', 'user-images');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(base64Data, 'base64'));

    return this.userRepository.update(id, { userImage: fileName });
  }
}
