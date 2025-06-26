import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import TodoModel from './todo';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000, },
    retry: { max: 3, },
    logging: console.log,
});

const Todo = TodoModel(sequelize);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log(`DB connected: ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    } catch (error: any) {
        console.error(`DB connection error: ${error.message}`);
    }
}

async function refreshDB() {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB synced');
    } catch (error: any) {
        console.error(`DB sync error: ${error.message}`);
    }
}

export { sequelize, Todo, connectDB, refreshDB };