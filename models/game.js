const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Character = require('./character'); // Importez le modèle Character
const Try = require('./try'); // Importez le modèle Try

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
    },
    end: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Par défaut, la partie n'est pas terminée
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Game',
});

// Définissez les associations entre les modèles
Game.belongsTo(Character, { foreignKey: 'id_character' }); // Un jeu appartient à un personnage
Game.hasMany(Try, { foreignKey: 'id_game' }); // Un jeu a plusieurs tries

module.exports = Game;
