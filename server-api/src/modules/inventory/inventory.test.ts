import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    inventory: {
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

describe('inventory module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to inventory endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/inventory').send({
      trackingNumber: 'INV-1001',
      companyId: 1,
      type: 'container',
      deviceType: '20ft',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list inventory when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.inventory.findFirst).mockResolvedValue(null);

    vi.mocked(prisma.inventory.create).mockResolvedValue({
      id: 1,
      trackingNumber: 'INV-1001',
      companyId: 7,
      type: 'container',
      deviceType: '20ft',
      status: 'active',
      length: 20,
      width: 8,
      height: 8,
      lwhType: 'ft',
      weight: 4000,
      weightType: 'lb',
      location: 'Dallas',
      notes: 'Priority shipment',
      packageId: null,
      createdBy: null,
      updatedBy: null,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    vi.mocked(prisma.inventory.findMany).mockResolvedValue([
      {
        id: 1,
        trackingNumber: 'INV-1001',
        companyId: 7,
        type: 'container',
        deviceType: '20ft',
        status: 'active',
        length: 20,
        width: 8,
        height: 8,
        lwhType: 'ft',
        weight: 4000,
        weightType: 'lb',
        location: 'Dallas',
        notes: 'Priority shipment',
        packageId: null,
        createdBy: null,
        updatedBy: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ] as any);

    const createResponse = await request(app)
      .post('/api/inventory')
      .set('Authorization', `Bearer ${token}`)
      .send({
        trackingNumber: 'INV-1001',
        companyId: 7,
        type: 'container',
        deviceType: '20ft',
        status: 'active',
        length: 20,
        width: 8,
        height: 8,
        lwhType: 'ft',
        weight: 4000,
        weightType: 'lb',
        location: 'Dallas',
        notes: 'Priority shipment',
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.trackingNumber).toBe('INV-1001');

    const listResponse = await request(app)
      .get('/api/inventory')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ trackingNumber: 'INV-1001' }),
      ])
    );
  });
});
