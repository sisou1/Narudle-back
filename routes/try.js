// routes/try.js

const express = require('express');
const router = express.Router();
const Try = require('../models/try');
const Game = require('../models/game');
const Character = require('../models/character');

/**
 * @swagger
 * tags:
 *   name: Tries
 *   description: API pour gérer les tries
 */

/**
 * @swagger
 * /tries:
 *   get:
 *     summary: Récupérer tous les tries
 *     tags: [Tries]
 *     responses:
 *       200:
 *         description: La liste des tries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Try'
 */

// Route pour récupérer tous les tries
router.get('/', async (req, res) => {
    try {
        const tries = await Try.findAll();
        res.status(200).json(tries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching tries' });
    }
});

/**
 * @swagger
 * /tries:
 *   post:
 *     summary: Ajouter un try
 *     tags: [Tries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_game:
 *                 type: integer
 *                 description: L'ID du game
 *               character_name:
 *                 type: string
 *                 description: Le nom du personnage
 *     responses:
 *       201:
 *         description: Le try a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 genre:
 *                   type: string
 *                   description: Le résultat de la comparaison pour le genre
 *                 affiliations:
 *                   type: string
 *                   description: Le résultat de la comparaison pour les affiliations
 *                 rang:
 *                   type: string
 *                   description: Le résultat de la comparaison pour le rang
 *                 chakra:
 *                   type: string
 *                   description: Le résultat de la comparaison pour le chakra
 *                 attributs:
 *                   type: string
 *                   description: Le résultat de la comparaison pour les attributs
 *                 arc:
 *                   type: string
 *                   description: Le résultat de la comparaison pour l'arc
 *       404:
 *         description: Personnage non trouvé
 *       500:
 *         description: Une erreur est survenue lors de la création du try
 */

// Route pour créer un nouveau Try
router.post('/', async (req, res) => {
    const { id_game, character_name } = req.body;

    try {
        // Recherchez le jeu par id
        const game = await Game.findOne({ where: { id: id_game } });
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        // Recherchez le personnage de la game
        const gameCharacter = await Character.findOne({ where: { id: game.id_character } });
        if (!gameCharacter) {
            return res.status(404).json({ error: 'Game character not found' });
        }

        // Recherchez le personnage par nom
        const tryCharacter = await Character.findOne({ where: { name: character_name } });
        if (!tryCharacter) {
            return res.status(404).json({ error: 'Character not found' });
        }

        // Comparaison des attributs
        const compareAttributes = (attr1, attr2) => {
            if (attr1 === attr2) return 'ok';
            const set1 = new Set(attr1.split(','));
            const set2 = new Set(attr2.split(','));
            const intersection = new Set([...set1].filter(x => set2.has(x)));
            if (intersection.size > 0) return 'partiel';
            return 'faux';
        };

        const result = {
            genre: gameCharacter.genre === tryCharacter.genre ? 'ok' : 'faux',
            affiliations: compareAttributes(gameCharacter.affiliations, tryCharacter.affiliations),
            rang: gameCharacter.rang === tryCharacter.rang ? 'ok' : 'faux',
            chakra: compareAttributes(gameCharacter.chakra, tryCharacter.chakra),
            attributs: compareAttributes(gameCharacter.attributs, tryCharacter.attributs),
            arc: gameCharacter.arc === tryCharacter.arc ? 'ok' : 'faux'
        };

        // Créez un nouveau Try
        const newTry = await Try.create({
            id_game: id_game,
            id_character: tryCharacter.id
        });

        // Renvoyez le résultat de la comparaison
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the Try' });
    }
});

module.exports = router;
