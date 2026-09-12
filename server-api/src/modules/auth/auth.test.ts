import { describe, it, expect, vi } from 'vitest';

import { AppError } from '../../common/errors/AppError.js';
import { ok, created, fail } from '../../common/utils/response.js';
import { AuthService } from './auth.service.js';

describe('auth module', () => {
  it('should bootstrap the module', () => {
    expect(true).toBe(true);
  });

  it('should return a consistent API envelope for success and failure responses', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    ok(res, 'Success', { id: 1 }, { page: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'Success',
      data: { id: 1 },
      meta: { page: 1 },
    });

    const errRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    fail(errRes, 400, 'Invalid input', { code: 'INVALID_INPUT' });
    expect(errRes.status).toHaveBeenCalledWith(400);
    expect(errRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Invalid input',
      data: { code: 'INVALID_INPUT' },
    });

    const createdRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    created(createdRes, 'Created', { id: 2 });
    expect(createdRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Created',
      data: { id: 2 },
    });
  });

  it('should validate successful login and rejected credentials in the auth service', async () => {
    const user = {
      id: 1,
      email: 'demo@example.com',
      password: 'hashed-password',
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
    };

    const service = new AuthService({
      findByEmail: vi.fn().mockResolvedValue(user),
      createUser: vi.fn(),
    } as any);

    vi.spyOn(service, 'comparePassword').mockResolvedValue(true);

    await expect(service.login('demo@example.com', 'secret123')).resolves.toEqual(user);

    const missingUserService = new AuthService({
      findByEmail: vi.fn().mockResolvedValue(null),
      createUser: vi.fn(),
    } as any);

    await expect(missingUserService.login('missing@example.com', 'secret123')).rejects.toBeInstanceOf(AppError);
  });

  it('should reject signup when passwords do not match or the email already exists', async () => {
    const service = new AuthService({
      findByEmail: vi.fn().mockResolvedValue({ id: 1, email: 'existing@example.com' }),
      createUser: vi.fn(),
    } as any);

    await expect(
      service.signup({
        email: 'new@example.com',
        password: 'Secret123',
        confirmPassword: 'Secret456',
        firstName: 'New',
        lastName: 'User',
      })
    ).rejects.toMatchObject({ statusCode: 400, message: 'Password and confirm password do not match' });

    const service2 = new AuthService({
      findByEmail: vi.fn().mockResolvedValue({ id: 2, email: 'existing@example.com' }),
      createUser: vi.fn(),
    } as any);

    await expect(
      service2.signup({
        email: 'existing@example.com',
        password: 'Secret123',
        confirmPassword: 'Secret123',
        firstName: 'Existing',
        lastName: 'User',
      })
    ).rejects.toMatchObject({ statusCode: 409, message: 'Email address is already taken' });
  });
});
