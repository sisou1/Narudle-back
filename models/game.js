const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Character = require('./character'); // Importez le modèle Character

class Game extends Model {}

Game.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
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
Game.belongsTo(Character, { foreignKey: 'id_character' }); // Un jeu appartient à un personnage

module.exports = Game;
