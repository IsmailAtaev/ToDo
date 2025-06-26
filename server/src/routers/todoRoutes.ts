import { FastifyInstance } from 'fastify';
import * as controller from '../controller/todoController';
import * as schema from '../schemas/todoSchemas';

export default async function todoRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/', controller.getTodos);
  fastify.get('/:id', controller.getTodoById);
  fastify.delete('/:id', controller.deleteTodo);

  fastify.post('/', {
    schema: {
      body: schema.todoBodySchema,
      response: { 201: schema.todoResponseSchema },
    },
    handler: controller.createTodo,
  });

  fastify.put('/:id', {
    schema: {
      body: schema.todoBodySchema,
      response: { 200: schema.todoResponseSchema },
    },
    handler: controller.updateTodo,
  });
}