const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../domain/model/User'); 
require('dotenv').config();

const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Проверка на наличие всех необходимых полей
    if (!username || !password) {
        return res.status(400).send({ message: 'Все поля обязательны' });
    }

    const hashedPassword = bcrypt.hashSync(password, 4);
    
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).send({ message: 'Пользователь зарегистрирован', user });
    } catch (error) {
        res.status(400).send({ message: 'Ошибка регистрации', error });
    }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).send('Пользователь не найден');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        // Возвращаем информацию о пользователе вместе с токеном
        res.status(200).send({ auth: true, token, userData: { username: user.username } });
    } catch (error) {
        res.status(500).send({ message: 'Ошибка авторизации', error });
    }
});

module.exports = router;