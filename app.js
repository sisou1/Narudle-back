    // app.js

    const express = require('express');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const swaggerUi = require('swagger-ui-express');
    const sequelize = require('./config/database');
    const swaggerDocs = require('./config/swaggerConfig'); // Importez la configuration Swagger
    const Character = require('./models/character');

    // Routers
    const indexRouter = require('./routes/index');
    const usersRouter = require('./routes/users');
    const charactersRouter = require('./routes/character'); // Utilisez le nouveau nom de fichier

    const app = express();

    // Middleware
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // Routes
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/characters', charactersRouter); // Utilisez le routeur pour les personnages

    // Utilisez la configuration Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Synchronisez les modèles avec la base de données
    sequelize.sync({}).then(() => {
        console.log('Tables synchronisées avec succès.');
    }).catch(err => {
        console.error('Erreur lors de la synchronisation des tables :', err);
    });

    module.exports = app;
