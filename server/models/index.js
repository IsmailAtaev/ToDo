require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
        max: 5, min: 0, acquire: 30000, idle: 10000
    },
    retry: 3,
    logging: true
});

const CONNECT_DB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB connected: ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    } catch (error) {
        console.error(`B connection error: ${error.message}`);
    }
};

const REFRESH_DB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB synced');
    } catch (error) {
        console.error(`DB sync error: ${error.message}`);
    }
};

const db = {};
db.CONNECT_DB = CONNECT_DB;
db.REFRESH_DB = REFRESH_DB;
db.sequelize = sequelize;
db.Todo = require('./todo')(sequelize);

module.exports = db;
