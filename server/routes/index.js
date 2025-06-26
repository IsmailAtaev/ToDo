const todoRoutes = require('./todoRoutes');

async function router(fastify, options) {
  fastify.register(todoRoutes, { prefix: '/todos' });
}

module.exports = router;