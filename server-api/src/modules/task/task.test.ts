import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
  prisma: {
    task: {
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

const prismaMock = prisma as any;

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

describe('task module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should reject unauthenticated requests to task endpoints', async () => {
    const app = createApp();

    const response = await request(app).post('/api/task').send({
      subject: 'Follow up on quote',
      type: 'quote',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });

  it('should create and list tasks when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    prismaMock.task.create.mockResolvedValue({
      id: 1,
      type: 'quote',
      subject: 'Follow up on quote',
      description: 'Check pricing',
      priority: 'high',
      dueDateTime: new Date('2025-01-10T00:00:00.000Z'),
      reminderDateTime: null,
      category: 'sales',
      status: 'open',
      assignedTo: null,
      pointOfContact: null,
      quoteId: 10,
      companyId: 7,
      inventoryId: null,
      userId: 1,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    prismaMock.task.findMany.mockResolvedValue([
      {
        id: 1,
        type: 'quote',
        subject: 'Follow up on quote',
        description: 'Check pricing',
        priority: 'high',
        dueDateTime: new Date('2025-01-10T00:00:00.000Z'),
        reminderDateTime: null,
        category: 'sales',
        status: 'open',
        assignedTo: null,
        pointOfContact: null,
        quoteId: 10,
        companyId: 7,
        inventoryId: null,
        userId: 1,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    prismaMock.task.count.mockResolvedValue(1);

    const createResponse = await request(app)
      .post('/api/task/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'quote',
        subject: 'Follow up on quote',
        description: 'Check pricing',
        priority: 'high',
        category: 'sales',
        status: 'open',
        quoteId: 10,
        companyId: 7,
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.status).toBe(true);
    expect(createResponse.body.data.subject).toBe('Follow up on quote');

    const listResponse = await request(app)
      .post('/api/task/list')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.status).toBe(true);
    expect(listResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: 'Follow up on quote' }),
      ])
    );
  });

  it('should delete multiple tasks when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    prismaMock.task.deleteMany.mockResolvedValue({ count: 2 });

    const response = await request(app)
      .post('/api/task/delete-range')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [1, 2] });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Tasks have been deleted successfully.');
  });
});
