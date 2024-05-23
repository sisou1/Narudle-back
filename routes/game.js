// routes/game.js

const express = require('express');
const router = express.Router();
const Game = require('../models/game'); // Chemin correct vers le modèle Game

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
 *               id_user:
 *                 type: integer
 *                 description: L'ID de l'utilisateur
 *               id_character:
 *                 type: integer
 *                 description: L'ID du personnage
 *     responses:
 *       201:
 *         description: Le game a été créé avec succès
 *       500:
 *         description: Une erreur est survenue lors de la création du game
 */

// Route pour créer un nouveau Game
router.post('/', async (req, res) => {
    const { id_user, id_character } = req.body;

    try {
        // Créez un nouveau Game
        const newGame = await Game.create({
            id_user: id_user,
            id_character: id_character
        });

        res.status(201).json(newGame);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the Game' });
    }
});

module.exports = router;
