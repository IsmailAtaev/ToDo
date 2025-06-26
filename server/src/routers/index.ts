import { FastifyInstance } from 'fastify';
import todoRoutes from './todoRoutes';

export default async function router(fastify: FastifyInstance): Promise<void> {
  fastify.register(todoRoutes, { prefix: '/todos' });
}