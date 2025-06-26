const { getUsers, createUser } = require('../controllers/userController');

async function userRoutes(fastify, options) {
  fastify.get('/', getUsers);
  fastify.post('/', createUser);
}

module.exports = userRoutes;