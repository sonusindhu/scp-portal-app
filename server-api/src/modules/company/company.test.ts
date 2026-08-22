import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';

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
  beforeEach(async () => {
    await prisma.company.deleteMany();
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

    await prisma.company.create({
      data: {
        name: 'Northwind',
        email: 'northwind@example.com',
      },
    });

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
});
