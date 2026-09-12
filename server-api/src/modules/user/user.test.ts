import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

function withAuth(token?: string) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

describe('user module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to user profile endpoints', async () => {
    const app = createApp();

    const response = await request(app).get('/api/user/detail');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should get current user detail when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
      jobTitle: 'Manager',
      department: 'Sales',
      location: 'Dallas',
      phoneNumber: '1234567890',
      extension: '101',
      userImage: null,
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const response = await request(app)
      .get('/api/user/detail')
      .set(withAuth(token));

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.email).toBe('demo@example.com');
    expect(response.body.data.fullName).toBe('Demo User');
  });

  it('should update the current user profile when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.user.update).mockResolvedValue({
      id: 1,
      email: 'demo@example.com',
      firstName: 'Updated',
      lastName: 'User',
      fullName: 'Updated User',
      jobTitle: 'Director',
      department: 'Operations',
      location: 'Austin',
      phoneNumber: '9876543210',
      extension: '202',
      userImage: null,
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const response = await request(app)
      .post('/api/user/update')
      .set(withAuth(token))
      .send({
        email: 'demo@example.com',
        firstName: 'Updated',
        lastName: 'User',
        jobTitle: 'Director',
        department: 'Operations',
        location: 'Austin',
        phoneNumber: '9876543210',
        extension: '202',
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.fullName).toBe('Updated User');
  });
});
