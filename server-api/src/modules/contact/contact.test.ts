import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    contact: {
      deleteMany: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      count: vi.fn(),
    },
    company: {
      deleteMany: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

describe('contact module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to contact endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/contact').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      companyId: 1,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list contacts when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.contact.findFirst).mockResolvedValue(null);

    vi.mocked(prisma.contact.create).mockResolvedValue({
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      companyId: 5,
      status: 'active',
      department: 'Sales',
      jobTitle: 'Account Manager',
      phone: '1234567890',
      extension: null,
      address1: null,
      address2: null,
      city: null,
      zipcode: null,
      state: null,
      country: null,
      birthDate: null,
      isDeleted: false,
      createdBy: null,
      updatedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    vi.mocked(prisma.contact.findMany).mockResolvedValue([
      {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        companyId: 5,
        status: 'active',
        department: 'Sales',
        jobTitle: 'Account Manager',
        phone: '1234567890',
        extension: null,
        address1: null,
        address2: null,
        city: null,
        zipcode: null,
        state: null,
        country: null,
        birthDate: null,
        isDeleted: false,
        createdBy: null,
        updatedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as any);

    const createResponse = await request(app)
      .post('/api/contact')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        companyId: 5,
        status: 'active',
        department: 'Sales',
        jobTitle: 'Account Manager',
        phone: '1234567890',
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.email).toBe('jane@example.com');

    const listResponse = await request(app)
      .get('/api/contact')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ email: 'jane@example.com' }),
      ])
    );
  });
});
