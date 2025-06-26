import fastify from 'fastify';
import path from 'path';
import helmet from '@fastify/helmet';
const YAML = require('yamljs');
import todoRoutes from './routers/todoRoutes';
import { connectDB, refreshDB } from './models';

const PORT = 3000;

const swaggerDoc = YAML.load(path.join(__dirname, 'docs', 'todo.yaml'));

const app = fastify({ logger: true });

app.register(helmet, { global: true });

app.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: { document: swaggerDoc, },
});

app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'full', },
});

app.register(todoRoutes, { prefix: '/api/todos' });

const start = async () => {
    try {
        await connectDB();
        await refreshDB();

        await app.listen({ port: PORT });
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`📄 Swagger docs available at http://localhost:${PORT}/docs`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();