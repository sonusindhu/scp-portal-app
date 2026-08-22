import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    company: {
      deleteMany: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      delete: vi.fn(),
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

describe('company module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to company endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/company').send({
      name: 'Acme Logistics',
      email: 'hello@acme.com',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create a company through the HTTP API when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.company.create).mockResolvedValue({
      id: 1,
      name: 'Acme Logistics',
      email: 'hello@acme.com',
      type: 'customer',
      status: 'active',
      phone: '1234567890',
      address1: null,
      address2: null,
      city: 'Dallas',
      state: 'TX',
      zipcode: null,
      country: 'USA',
      employeesCount: 120,
      revenue: 5000000,
      mainContactId: null,
      createdBy: null,
      updatedBy: null,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const response = await request(app)
      .post('/api/company')
      .set(withAuth(token))
      .send({
        name: 'Acme Logistics',
        email: 'hello@acme.com',
        type: 'customer',
        status: 'active',
        phone: '1234567890',
        city: 'Dallas',
        state: 'TX',
        country: 'USA',
        employeesCount: 120,
        revenue: 5000000,
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.email).toBe('hello@acme.com');
    expect(response.body.data.name).toBe('Acme Logistics');
  });

  it('should list company names when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.company.findMany).mockResolvedValue([
      {
        id: 1,
        name: 'Northwind',
        email: 'northwind@example.com',
        type: null,
        status: null,
        phone: null,
        extension: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zipcode: null,
        country: null,
        employeesCount: null,
        revenue: null,
        mainContactId: null,
        createdBy: null,
        updatedBy: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as any);

    const response = await request(app)
      .get('/api/company/list-of-names')
      .set(withAuth(token));

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Northwind' }),
      ])
    );
  });

  it('should delete multiple companies when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.company.deleteMany).mockResolvedValue({ count: 2 });

    const response = await request(app)
      .post('/api/company/delete-range')
      .set(withAuth(token))
      .send({ ids: [1, 2] });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Companies has been deleted successfully.');
  });
});
