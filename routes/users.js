// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour gérer les utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste des utilisateurs
 *     description: Retourne une liste d'utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Un tableau d'utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

// Route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Ajouter un utilisateur
 *     description: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pseudo:
 *                 type: string
 *                 description: Le pseudo de l'utilisateur
 *               mot_de_passe:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Une erreur est survenue lors de la création de l'utilisateur
 */

// Route pour créer un nouvel utilisateur
router.post('/', async (req, res) => {
  const { pseudo, mot_de_passe } = req.body;

  try {
    // Créez un nouvel utilisateur
    const newUser = await User.create({
      pseudo,
      mot_de_passe,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

module.exports = router;
