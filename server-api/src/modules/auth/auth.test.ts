import { describe, it, expect, vi } from 'vitest';

import { ok, created, fail } from '../../common/utils/response.js';

describe('auth module', () => {
  it('should bootstrap the module', () => {
    expect(true).toBe(true);
  });

  it('should return a consistent API envelope for success and failure responses', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    ok(res, 'Success', { id: 1 }, { page: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: 'Success',
      data: { id: 1 },
      meta: { page: 1 },
    });

    const errRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    fail(errRes, 400, 'Invalid input', { code: 'INVALID_INPUT' });
    expect(errRes.status).toHaveBeenCalledWith(400);
    expect(errRes.json).toHaveBeenCalledWith({
      status: false,
      message: 'Invalid input',
      data: { code: 'INVALID_INPUT' },
    });

    const createdRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as any;

    created(createdRes, 'Created', { id: 2 });
    expect(createdRes.json).toHaveBeenCalledWith({
      status: true,
      message: 'Created',
      data: { id: 2 },
    });
  });
});
