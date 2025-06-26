const controller = require('../controllers/todoController');
const schema = require('../schemas/todoSchemas');

async function todoRoutes(fastify) {
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

module.exports = todoRoutes;