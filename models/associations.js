// models/associations.js
const Game = require('./game');
const Try = require('./try');
const Character = require('./character');

function setupAssociations() {
    Game.belongsTo(Character, { foreignKey: 'id_character' });
    Game.hasMany(Try, { foreignKey: 'id_game', as: 'tries' });

    Try.belongsTo(Game, { foreignKey: 'id_game' });
    Try.belongsTo(Character, { foreignKey: 'id_character' });
}

module.exports = setupAssociations;
