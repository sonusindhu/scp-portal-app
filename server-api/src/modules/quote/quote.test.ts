import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    quote: {
      deleteMany: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

describe('quote module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to quote endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/quote').send({
      name: 'LTL Quote',
      service: 'LTL',
      transportMode: 'Truck',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list quotes when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.quote.findFirst).mockResolvedValue(null);
    vi.mocked(prisma.quote.create).mockResolvedValue({
      id: 1,
      quoteNumber: 'Q20250101',
      name: 'LTL Quote',
      service: 'LTL',
      transportMode: 'Truck',
      status: 'draft',
      totalCost: 500,
      totalProfit: 100,
      expiryDate: new Date('2025-01-10T00:00:00.000Z'),
      totalMiles: 150,
      companyId: 2,
      contactId: 3,
      createdBy: 1,
      updatedBy: null,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    vi.mocked(prisma.quote.findMany).mockResolvedValue([
      {
        id: 1,
        quoteNumber: 'Q20250101',
        name: 'LTL Quote',
        service: 'LTL',
        transportMode: 'Truck',
        status: 'draft',
        totalCost: 500,
        totalProfit: 100,
        expiryDate: new Date('2025-01-10T00:00:00.000Z'),
        totalMiles: 150,
        companyId: 2,
        contactId: 3,
        createdBy: 1,
        updatedBy: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as any);

    vi.mocked(prisma.quote.count).mockResolvedValue(1);

    const createResponse = await request(app)
      .post('/api/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'LTL Quote',
        service: 'LTL',
        transportMode: 'Truck',
        status: 'draft',
        totalCost: 500,
        totalProfit: 100,
        expiryDate: '2025-01-10T00:00:00.000Z',
        totalMiles: 150,
        companyId: 2,
        contactId: 3,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.name).toBe('LTL Quote');

    const listResponse = await request(app)
      .get('/api/quote')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'LTL Quote' }),
      ])
    );
  });
});
