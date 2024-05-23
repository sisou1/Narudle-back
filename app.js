// app.js

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const swaggerDocs = require('./config/swaggerConfig');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/character');
const tryRouter = require('./routes/try');
const gameRouter = require('./routes/game');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/tries', tryRouter);
app.use('/games', gameRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sync models with database
sequelize.sync({}).then(() => {
    console.log('Tables synchronisées avec succès.');
}).catch(err => {
    console.error('Erreur lors de la synchronisation des tables :', err);
});

module.exports = app;
