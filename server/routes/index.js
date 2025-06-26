const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

async function router(fastify, options) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(todoRoutes, { prefix: '/todos' });
}

module.exports = router;