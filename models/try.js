// models/try.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Game = require('./game'); // Importez le modèle Game
const Character = require('./character'); // Importez le modèle Character

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

Try.belongsTo(Game, { foreignKey: 'id_game' }); // Un try appartient à un game
Try.belongsTo(Character, { foreignKey: 'id_character' }); // Un try appartient à un personnage

module.exports = Try;
