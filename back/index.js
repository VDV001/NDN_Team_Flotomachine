require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./infra/bd');
const authRoutes = require('./routes/api/v1/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение маршрутов аутентификации
app.use('/api/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});