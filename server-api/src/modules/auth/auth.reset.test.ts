import { describe, it, expect, vi } from 'vitest';

import { AppError } from '../../common/errors/AppError.js';
import { AuthService } from './auth.service.js';

describe('auth reset flow', () => {
  it('should request a password reset for a valid user', async () => {
    const service = new AuthService({
      findByEmail: vi.fn().mockResolvedValue({
        id: 1,
        email: 'demo@example.com',
        fullName: 'Demo User',
      }),
      createUser: vi.fn(),
      updateUserPasswordResetToken: vi.fn().mockResolvedValue({}),
      findByResetToken: vi.fn(),
      resetPasswordWithToken: vi.fn(),
    } as any);

    await expect(service.requestPasswordReset('demo@example.com')).resolves.toMatchObject({
      message: 'Please check your email for the password reset link.',
    });
  });

  it('should reject invalid reset password tokens', async () => {
    const service = new AuthService({
      findByEmail: vi.fn(),
      createUser: vi.fn(),
      updateUserPasswordResetToken: vi.fn(),
      findByResetToken: vi.fn().mockResolvedValue(null),
      resetPasswordWithToken: vi.fn(),
    } as any);

    await expect(service.resetPassword({ token: 'bad-token', password: 'Secret123', confirmPassword: 'Secret123' })).rejects.toBeInstanceOf(AppError);
  });
});
