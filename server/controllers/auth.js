'use strict';

const express = require('express');
var route = express.Router();

const { validate } = require("express-validation");

const authValidation = require('../validations/authValidations');

const { PrismaClient } = require('@prisma/client');
const {isEmail} = require("validator");

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');

route.post('/register', validate(authValidation.create, {}, {}), async (request, response, next) => {
   
    try {

        if (request.body.password !== request.body.passwordConfirmation)
        {
            return response.status(400).json({
                name: 'ValidationError',
                message: 'Validation Failed',
                statusCode: 400,
                error: 'Bad Request',
                details: {
                    body: [
                        {
                            message: 'Invalid password',
                        },
                    ],
                }
            })
        }

        const emailExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: request.body.email },
                    { username: request.body.username }
                ]
            },
        })

        if (emailExists) {
            return response.status(400).json({
                name: 'ValidationError',
                message: 'Validation Failed',
                statusCode: 400,
                error: 'Bad Request',
                details: {
                    body: [
                        {
                            message: 'User already registered',
                        },
                    ],
                }
            })
        }

        let hashedPassword = await bcrypt.hash(request.body.password, 10);

        let user = await prisma.user.create({
            data: {
                email: request.body.email,
                username: request.body.username,
                password: hashedPassword,
                name: request.body.name
            }
        })

        return response.status(200).json({
            status: "success",
            message: "Kayıt başarılı, giriş yapabilirsiniz...",
        })

    } catch (err) {
        return response.status(400).json({
            name: 'ValidationError',
            message: 'Validation Failed',
            statusCode: 400,
            error: 'Bad Request',
            details: {
                body: [
                    {
                        message: err,
                    },
                ],
            }

        })
    }

});

route.post('/login', validate(authValidation.login, {}, {}), async (request, response, next) => {

    let emailOrUsername = true;

    if (!isEmail(request.body.email)) {
        emailOrUsername = false;
    }

    try {

        if (emailOrUsername === true) {
            var userExists = await prisma.user.findFirst({
                where: {
                    email: request.body.email,
                }
            })
        } else {
            var userExists = await prisma.user.findFirst({
                where: {
                    username: request.body.email,
                }
            })
        }

        if (!userExists)
        {
            return response.status(400).json({
                name: 'ValidationError',
                message: 'Validation Failed',
                statusCode: 400,
                error: 'Bad Request',
                details: {
                    body: [
                        {
                            message: 'User does not exist',
                        },
                    ],
                }
            });
        }

        bcrypt.compare(request.body.password, userExists.password, function (err, result) {
            if (err && !result) {
                return response.status(400).json({
                    name: 'ValidationError',
                    message: 'Validation Failed',
                    statusCode: 400,
                    error: 'Bad Request',
                    details: {
                        body: [
                            {
                                message: 'Password not match',
                            },
                        ],
                    }
                });
            }
        })

        let username = userExists.username;

        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return response.status(200).json({
            status: "success",
            message: "Giriş başarılı",
            accessToken: token
        })

    } catch (err) {
        return response.status(400).json({
            name: 'ValidationError',
            message: 'Validation Failed',
            statusCode: 400,
            error: 'Bad Request',
            details: {
                body: [
                    {
                        message: err,
                    },
                ],
            }
        })
    }

});

route.post('/verifyToken', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, message: 'Token is missing' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }
        // Token geçerli ise
        res.status(200).json({ valid: true, message: 'Token is valid', user: decoded });
    });
});

module.exports = route;