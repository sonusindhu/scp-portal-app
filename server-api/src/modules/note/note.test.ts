import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    note: {
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

describe('note module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to note endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/note').send({
      title: 'Follow up',
      message: 'Please review the quote.',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list notes when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    prismaMock.note.create.mockResolvedValue({
      id: 1,
      type: 'quote',
      title: 'Follow up',
      message: 'Please review the quote.',
      isCritical: true,
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

    prismaMock.note.findMany.mockResolvedValue([
      {
        id: 1,
        type: 'quote',
        title: 'Follow up',
        message: 'Please review the quote.',
        isCritical: true,
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

    prismaMock.note.count.mockResolvedValue(1);

    const createResponse = await request(app)
      .post('/api/note')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'quote',
        title: 'Follow up',
        message: 'Please review the quote.',
        isCritical: true,
        quoteId: 10,
        companyId: 7,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.title).toBe('Follow up');

    const listResponse = await request(app)
      .get('/api/note')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Follow up' }),
      ])
    );
  });

  it('should delete multiple notes when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    prismaMock.note.deleteMany.mockResolvedValue({ count: 2 });

    const response = await request(app)
      .post('/api/note/delete-range')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [1, 2] });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Notes have been deleted successfully.');
  });
});
