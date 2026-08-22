import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SCP Portal API',
      version: '1.0.0',
      description: 'OpenAPI documentation for the SCP Portal Express API.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local development server',
      },
    ],
    tags: [
      { name: 'Health', description: 'Service health endpoints' },
      { name: 'Auth', description: 'Authentication and registration endpoints' },
    ],
  },
  apis: ['./src/**/*.swagger.ts', './src/**/*.ts'],
});
