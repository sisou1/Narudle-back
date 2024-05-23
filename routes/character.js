// routes/character.js

const express = require('express');
const router = express.Router();
const Character = require('../models/character'); // Chemin correct vers le modèle Character

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: API pour gérer les personnages
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Récupérer tous les personnages
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: La liste des personnages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */

// Route pour récupérer tous les personnages
router.get('/', async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching characters' });
    }
});

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Ajouter un personnage
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom du personnage
 *               imageUrl:
 *                 type: string
 *                 description: L'URL de l'image du personnage
 *               genre:
 *                 type: string
 *                 description: Le genre du personnage
 *     responses:
 *       201:
 *         description: Le personnage a été créé avec succès
 *       500:
 *         description: Une erreur est survenue lors de la création du personnage
 */

// Route POST pour ajouter un personnage
router.post('/', async (req, res) => {
    try {
        // Récupérez les données du corps de la requête
        const { name, imageUrl, genre, affiliations, rang, chakra, attributs, arc } = req.body;

        // Créez un nouveau personnage dans la base de données
        const newCharacter = await Character.create({ name, imageUrl, genre, affiliations, rang, chakra, attributs, arc });

        res.status(201).json(newCharacter); // Renvoyez la réponse avec le personnage créé
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du personnage.' });
    }
});

module.exports = router;
