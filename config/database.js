// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bbqyyjib44nyjiztsw7h', 'u6osrmbevachdp6c', 'bjL5ucJs285yrv3LG8GF', {
    host: 'bbqyyjib44nyjiztsw7h-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

module.exports = sequelize;
