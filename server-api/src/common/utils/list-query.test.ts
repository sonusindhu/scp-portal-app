import { describe, expect, it } from 'vitest';

import { buildFilterWhere, listQuerySchema, parseSortValue } from './list-query.js';

describe('list-query utils', () => {
  it('parses sort values with a safe fallback', () => {
    expect(parseSortValue([], 'createdAt', 'desc')).toEqual({
      field: 'createdAt',
      direction: 'desc',
    });

    expect(parseSortValue(['name asc'])).toEqual({
      field: 'name',
      direction: 'asc',
    });

    expect(parseSortValue(['name foo'])).toEqual({
      field: 'name',
      direction: 'desc',
    });
  });

  it('builds nested Prisma filters for grid logic groups', () => {
    const filter = {
      logic: 'and',
      filters: [
        { field: 'companyName', operator: 'contains', value: 'Acme' },
        {
          logic: 'or',
          filters: [
            { field: 'status', operator: 'eq', value: 'active' },
            { field: 'status', operator: 'eq', value: 'pending' },
          ],
        },
      ],
    };

    expect(buildFilterWhere(filter)).toEqual({
      AND: [
        { companyName: { contains: 'Acme', mode: 'insensitive' } },
        {
          OR: [{ status: 'active' }, { status: 'pending' }],
        },
      ],
    });
  });

  it('accepts the canonical grid list query payload shape', () => {
    const payload = {
      skip: 0,
      take: 25,
      sort: ['name asc'],
      filter: {
        logic: 'and',
        filters: [{ field: 'name', operator: 'contains', value: 'Acme' }],
      },
    };

    expect(listQuerySchema.parse(payload)).toEqual(payload);
  });
});
