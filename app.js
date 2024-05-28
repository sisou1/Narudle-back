const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const swaggerDocs = require('./config/swaggerConfig');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const charactersRouter = require('./routes/character');
const tryRouter = require('./routes/try');
const gameRouter = require('./routes/game');

// Models and Associations
const setupAssociations = require('./models/associations');

const app = express();

// Utiliser cors
app.use(cors());

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware pour gérer les requêtes HEAD
app.use((req, res, next) => {
    if (req.method === 'HEAD') {
        res.status(200).end();
    } else {
        next();
    }
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/characters', charactersRouter);
app.use('/tries', tryRouter);
app.use('/games', gameRouter);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Setup associations
setupAssociations();

// Sync models with database
sequelize.sync({}).then(() => {
    console.log('Tables synchronisées avec succès.');
}).catch(err => {
    console.error('Erreur lors de la synchronisation des tables :', err);
});

module.exports = app;
