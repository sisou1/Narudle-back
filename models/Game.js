// models/Game.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importez le modèle User
const Character = require('./Character'); // Importez le modèle Character

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_character: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Game',
});

// Définissez les associations entre les modèles
Game.belongsTo(User, { foreignKey: 'id_user' }); // Un jeu appartient à un utilisateur
Game.belongsTo(Character, { foreignKey: 'id_character' }); // Un jeu appartient à un personnage

module.exports = Game;
