const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Character extends Model {}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false // Rend id non nullable
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true // Rend name non nullable
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // Rend imageUrl non nullable
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true // Rend genre non nullable
    },
    affiliations: {
        type: DataTypes.STRING,
        allowNull: true // Rend affiliations non nullable
    },
    rang: {
        type: DataTypes.STRING,
        allowNull: true // Rend rang non nullable
    },
    chakra: {
        type: DataTypes.STRING,
        allowNull: true // Rend chakra non nullable
    },
    attributs: {
        type: DataTypes.STRING,
        allowNull: true // Rend attributs non nullable
    },
    arc: {
        type: DataTypes.STRING,
        allowNull: true // Rend arc non nullable
    }
}, {
    sequelize,
    modelName: 'Character',
});

module.exports = Character;
