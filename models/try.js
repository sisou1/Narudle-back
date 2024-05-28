// models/try.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Try extends Model {}

Try.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_game: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_character: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Try',
});

module.exports = Try;
