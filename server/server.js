const fastify = require('fastify')({ logger: true });
const path = require('path');
const helmet = require('@fastify/helmet');
const YAML = require('yamljs');
const todoRoutes = require('./routes/todoRoutes');
const db = require('./models');

const PORT = 3000;
db.CONNECT_DB();

const swaggerDoc = YAML.load(path.join(__dirname, 'docs', 'todo.yaml'));

fastify.register(helmet, { global: true });

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

fastify.register(todoRoutes, { prefix: '/api/todos' });

const start = async () => {
    try {
         db.REFRESH_DB();
        await fastify.listen({ port: PORT });
        console.log('🚀 Server is running on http://localhost:3000');
        console.log('📄 Swagger docs available at http://localhost:3000/docs');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();