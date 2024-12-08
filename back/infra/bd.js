const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем подключение к базе данных с использованием DATABASE_URL из .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'waf',
});

// Проверка подключения к базе данных
sequelize.authenticate()
    .then(() => console.log('Соединение с базой данных установлено'))
    .catch(err => console.error('Невозможно подключиться к базе данных:', err));

module.exports = sequelize;