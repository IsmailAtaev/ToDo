// const fastify = require('fastify')({ logger: true });
// const router = require('./routes');

// fastify.register(router, { prefix: '/api' });

// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000 });
//     console.log('🚀 Server is running on http://localhost:3000');
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();

const fastify = require('fastify')({ logger: true });
const path = require('path');
const YAML = require('yamljs');
const todoRoutes = require('./routes/todoRoutes');

// Загружаем YAML-файл
const swaggerDoc = YAML.load(path.join(__dirname, 'docs', 'todo.yaml'));

// Регистрируем Swagger UI
fastify.register(require('@fastify/swagger'), {
  mode: 'static',
  specification: {
    document: swaggerDoc,
  },
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
  },
});

// Регистрируем маршруты
fastify.register(todoRoutes, { prefix: '/api/todos' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('🚀 Server is running on http://localhost:3000');
    console.log('📄 Swagger docs available at http://localhost:3000/docs');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();