const { getTodos, createTodo } = require('../controllers/todoController');

async function todoRoutes(fastify, options) {
  fastify.get('/', getTodos);
  fastify.post('/', createTodo);
}

module.exports = todoRoutes;
