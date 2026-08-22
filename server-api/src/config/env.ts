import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().default('*'),
  JWT_SECRET: isTestEnvironment
    ? z.string().min(16, 'JWT_SECRET must be at least 16 characters long').default('test_jwt_secret_key_12345')
    : z.string().min(16, 'JWT_SECRET must be at least 16 characters long'),
  JWT_EXPIRES_IN: z.string().default('30d'),
  DATABASE_URL: isTestEnvironment
    ? z.string().url('DATABASE_URL must be a valid URL').default('postgresql://postgres:postgres@localhost:5432/scp_db_test')
    : z.string().url('DATABASE_URL must be a valid URL'),
});

export const env = envSchema.parse(process.env);

export type AppEnv = typeof env;
