const express = require('express');
const router = express.Router();
const Game = require('../models/game'); // Chemin correct vers le modèle Game
const Character = require('../models/character'); // Chemin correct vers le modèle Character

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API pour gérer les games
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Récupérer tous les games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: La liste des games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */

// Route pour récupérer tous les games
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.status(200).json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching games' });
    }
});

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Ajouter un game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: "Nom de l'utilisateur"
 *     responses:
 *       201:
 *         description: Le game a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 characterName:
 *                   type: string
 *                   description: "Le nom du personnage choisi"
 *                 gameId:
 *                   type: integer
 *                   description: "L'ID du jeu créé"
 *       500:
 *         description: Une erreur est survenue lors de la création du game
 */

// Route pour créer un nouveau Game
router.post('/', async (req, res) => {
    const { user } = req.body;

    try {
        // Récupérer tous les personnages
        const characters = await Character.findAll();
        if (characters.length === 0) {
            return res.status(500).json({ error: 'No characters found' });
        }

        // Choisir un personnage aléatoire
        const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

        // Créez un nouveau Game
        const newGame = await Game.create({
            user: user,
            id_character: randomCharacter.id,
            end: false // Initialement, la partie n'est pas terminée
        });

        // Retourner le nom du personnage choisi et l'ID du jeu créé
        res.status(201).json({ characterName: randomCharacter.name, gameId: newGame.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the Game' });
    }
});

/**
 * @swagger
 * /games/{id}/end:
 *   patch:
 *     summary: Mettre à jour la valeur end d'un game
 *     tags: [Games]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du jeu
 *     responses:
 *       200:
 *         description: Le jeu a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Jeu non trouvé
 *       500:
 *         description: Une erreur est survenue lors de la mise à jour du jeu
 */

// Route pour mettre à jour la valeur end d'un Game
router.patch('/:id/end', async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        game.end = true;
        await game.save();

        res.status(200).json({ message: 'Game updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the Game' });
    }
});

module.exports = router;
