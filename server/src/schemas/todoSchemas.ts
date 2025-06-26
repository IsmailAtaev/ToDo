import { FastifySchema } from 'fastify';

export const todoBodySchema: FastifySchema['body'] = {
  type: 'object',
  required: ['title', 'description'],
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 30 },
    description: { type: 'string', minLength: 1 },
  },
};

export const todoResponseSchema: FastifySchema['response'] = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    description: { type: 'string' },
  },
};