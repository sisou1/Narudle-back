// models/character.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Character extends Model {}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    affiliations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rang: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chakra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attributs: {
        type: DataTypes.STRING,
        allowNull: true
    },
    arc: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Character',
});

module.exports = Character;
