const express = require('express');
const router = express.Router();
const Game = require('../models/game'); // Chemin correct vers le modèle Game
const Character = require('../models/character'); // Chemin correct vers le modèle Character
const Try = require('../models/try'); // Chemin correct vers le modèle Try

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

/**
 * @swagger
 * /games:
 *   delete:
 *     summary: Supprimer tous les games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Tous les games ont été supprimés avec succès
 *       500:
 *         description: Une erreur est survenue lors de la suppression des games
 */

// Route pour supprimer tous les games
router.delete('/', async (req, res) => {
    try {
        await Game.destroy({ where: {} });
        res.status(200).json({ message: 'All games have been deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the games' });
    }
});

/**
 * @swagger
 * /games/{id}/tries:
 *   get:
 *     summary: Récupérer toutes les tentatives d'un jeu
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
 *         description: La liste des tentatives
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tentative
 *                   id_game:
 *                     type: integer
 *                     description: ID du jeu
 *                   id_character:
 *                     type: integer
 *                     description: ID du personnage
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date de création de la tentative
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date de mise à jour de la tentative
 *                   Character:
 *                     $ref: '#/components/schemas/Character'
 *                   essaie:
 *                     type: object
 *                     properties:
 *                       genre:
 *                         type: string
 *                         description: Le résultat de la comparaison pour le genre
 *                       affiliations:
 *                         type: string
 *                         description: Le résultat de la comparaison pour les affiliations
 *                       rang:
 *                         type: string
 *                         description: Le résultat de la comparaison pour le rang
 *                       chakra:
 *                         type: string
 *                         description: Le résultat de la comparaison pour le chakra
 *                       attributs:
 *                         type: string
 *                         description: Le résultat de la comparaison pour les attributs
 *                       arc:
 *                         type: string
 *                         description: Le résultat de la comparaison pour l'arc
 *       404:
 *         description: Jeu non trouvé
 *       500:
 *         description: Une erreur est survenue lors de la récupération des tentatives
 */

// Route pour récupérer toutes les tentatives d'un jeu
router.get('/:id/tries', async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id, {
            include: [{
                model: Try,
                as: 'tries',
                include: [{
                    model: Character,
                    as: 'Character'
                }]
            }]
        });

        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        const gameCharacter = await Character.findOne({ where: { id: game.id_character } });
        if (!gameCharacter) {
            return res.status(404).json({ error: 'Game character not found' });
        }

        const triesWithDetails = await Promise.all(game.tries.map(async (tryInstance) => {
            const tryCharacter = tryInstance.Character;

            if (!tryCharacter) {
                return null;
            }

            const compareAttributes = (attr1, attr2) => {
                if (attr1 === attr2) return 'ok';
                const set1 = new Set(attr1.split(','));
                const set2 = new Set(attr2.split(','));
                const intersection = new Set([...set1].filter(x => set2.has(x)));
                if (intersection.size > 0) return 'partiel';
                return 'faux';
            };

            const essaie = {
                genre: gameCharacter.genre === tryCharacter.genre ? 'ok' : 'faux',
                affiliations: compareAttributes(gameCharacter.affiliations, tryCharacter.affiliations),
                rang: gameCharacter.rang === tryCharacter.rang ? 'ok' : 'faux',
                chakra: compareAttributes(gameCharacter.chakra, tryCharacter.chakra),
                attributs: compareAttributes(gameCharacter.attributs, tryCharacter.attributs),
                arc: gameCharacter.arc === tryCharacter.arc ? 'ok' : 'faux'
            };

            return {
                id: tryInstance.id,
                id_game: tryInstance.id_game,
                id_character: tryInstance.id_character,
                createdAt: tryInstance.createdAt,
                updatedAt: tryInstance.updatedAt,
                Character: tryCharacter,
                essaie: essaie
            };
        }));

        res.status(200).json(triesWithDetails.filter(detail => detail !== null));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching tries' });
    }
});

// Ajouter cette route pour vérifier une partie non terminée
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const game = await Game.findOne({
            where: { user: userId, end: false },
            include: [{ model: Character }]
        });
        if (!game) {
            return res.status(404).json({ error: 'No unfinished game found' });
        }
        res.status(200).json(game);
    } catch (error) {
        console.error('Error fetching unfinished game:', error);
        res.status(500).json({ error: 'An error occurred while fetching the game' });
    }
});

module.exports = router;
