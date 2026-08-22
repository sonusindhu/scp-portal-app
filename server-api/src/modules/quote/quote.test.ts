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
    company: {
      findMany: vi.fn(),
    },
    contact: {
      findMany: vi.fn(),
    },
    note: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
    task: {
      create: vi.fn(),
      findMany: vi.fn(),
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

  it('should delete multiple quotes when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.quote.deleteMany).mockResolvedValue({ count: 2 });

    const response = await request(app)
      .post('/api/quote/delete-range')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [1, 2] });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Quotes have been deleted successfully.');
  });

  it('should return company and contact lookups and quote notes/tasks when authenticated', async () => {
    const app = createApp();
    const token = buildToken();

    vi.mocked(prisma.company.findMany).mockResolvedValue([
      { id: 1, name: 'Acme Logistics' },
    ] as any);

    vi.mocked(prisma.contact.findMany).mockResolvedValue([
      { id: 5, fullName: 'Jane Doe' },
    ] as any);

    vi.mocked(prisma.quote.findUnique).mockResolvedValue({
      id: 10,
      name: 'LTL Quote',
      companyId: 1,
      contactId: 5,
    } as any);

    vi.mocked(prisma.note.create).mockResolvedValue({
      id: 77,
      title: 'Follow up',
      message: 'Please review',
      isCritical: false,
      quoteId: 10,
      companyId: 1,
      contactId: 5,
      type: 'quote',
    } as any);

    vi.mocked(prisma.note.findMany).mockResolvedValue([
      {
        id: 77,
        title: 'Follow up',
        message: 'Please review',
        isCritical: false,
        quoteId: 10,
        companyId: 1,
        contactId: 5,
        type: 'quote',
      },
    ] as any);

    vi.mocked(prisma.task.create).mockResolvedValue({
      id: 88,
      subject: 'Check pricing',
      description: 'Review the cost break',
      priority: 'high',
      quoteId: 10,
      companyId: 1,
      type: 'quote',
    } as any);

    vi.mocked(prisma.task.findMany).mockResolvedValue([
      {
        id: 88,
        subject: 'Check pricing',
        description: 'Review the cost break',
        priority: 'high',
        quoteId: 10,
        companyId: 1,
        type: 'quote',
      },
    ] as any);

    const companiesResponse = await request(app)
      .get('/api/quote/getCompanies')
      .set('Authorization', `Bearer ${token}`);

    expect(companiesResponse.status).toBe(200);
    expect(companiesResponse.body.status).toBe(true);
    expect(companiesResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Acme Logistics' }),
      ])
    );

    const contactsResponse = await request(app)
      .get('/api/quote/getContactsByCompany/1')
      .set('Authorization', `Bearer ${token}`);

    expect(contactsResponse.status).toBe(200);
    expect(contactsResponse.body.status).toBe(true);
    expect(contactsResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fullName: 'Jane Doe' }),
      ])
    );

    const createNoteResponse = await request(app)
      .post('/api/quote/createNote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quoteId: 10,
        title: 'Follow up',
        message: 'Please review',
        isCritical: false,
      });

    expect(createNoteResponse.status).toBe(201);
    expect(createNoteResponse.body.data.title).toBe('Follow up');

    const noteListResponse = await request(app)
      .get('/api/quote/10/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(noteListResponse.status).toBe(200);
    expect(noteListResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Follow up' }),
      ])
    );

    const createTaskResponse = await request(app)
      .post('/api/quote/createTask')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quoteId: 10,
        subject: 'Check pricing',
        description: 'Review the cost break',
        priority: 'high',
      });

    expect(createTaskResponse.status).toBe(201);
    expect(createTaskResponse.body.data.subject).toBe('Check pricing');

    const taskListResponse = await request(app)
      .get('/api/quote/10/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(taskListResponse.status).toBe(200);
    expect(taskListResponse.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: 'Check pricing' }),
      ])
    );
  });
});
