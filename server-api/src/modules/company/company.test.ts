import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';

describe('company module', () => {
  beforeEach(async () => {
    await prisma.company.deleteMany();
  });

  it('should create a company through the HTTP API', async () => {
    const app = createApp();

    const response = await request(app).post('/api/company').send({
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

  it('should list company names', async () => {
    const app = createApp();

    await prisma.company.create({
      data: {
        name: 'Northwind',
        email: 'northwind@example.com',
      },
    });

    const response = await request(app).get('/api/company/list-of-names');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Northwind' }),
      ])
    );
  });
});
