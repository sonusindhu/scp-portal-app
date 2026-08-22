import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    email: {
      deleteMany: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

const prismaMock = prisma as any;

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

describe('email module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to email endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/email').send({
      title: 'Quote follow up',
      message: 'Please review the estimate.',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list emails when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    prismaMock.email.create.mockResolvedValue({
      id: 1,
      type: 'quote',
      title: 'Quote follow up',
      message: 'Please review the estimate.',
      toEmail: 'buyer@example.com',
      fromEmail: 'noreply@example.com',
      isCritical: false,
      quoteId: 10,
      contactId: null,
      companyId: 7,
      inventoryId: null,
      userId: 1,
      createdBy: 1,
      updatedBy: null,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.email.findMany.mockResolvedValue([
      {
        id: 1,
        type: 'quote',
        title: 'Quote follow up',
        message: 'Please review the estimate.',
        toEmail: 'buyer@example.com',
        fromEmail: 'noreply@example.com',
        isCritical: false,
        quoteId: 10,
        contactId: null,
        companyId: 7,
        inventoryId: null,
        userId: 1,
        createdBy: 1,
        updatedBy: null,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    prismaMock.email.count.mockResolvedValue(1);

    const createResponse = await request(app)
      .post('/api/email')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'quote',
        title: 'Quote follow up',
        message: 'Please review the estimate.',
        toEmail: 'buyer@example.com',
        fromEmail: 'noreply@example.com',
        quoteId: 10,
        companyId: 7,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.title).toBe('Quote follow up');

    const listResponse = await request(app)
      .get('/api/email')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Quote follow up' }),
      ])
    );
  });
});
