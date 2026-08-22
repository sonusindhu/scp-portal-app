import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';

import { createApp } from '../../app.js';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

function buildToken() {
  return jwt.sign({ id: 1 }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

describe('contact module', () => {
  beforeEach(async () => {
    await prisma.contact.deleteMany();
    await prisma.company.deleteMany();
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

    const company = await prisma.company.create({
      data: {
        name: 'Contoso Labs',
        email: 'hello@contoso.com',
      },
    });

    const createResponse = await request(app)
      .post('/api/contact')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        companyId: company.id,
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
