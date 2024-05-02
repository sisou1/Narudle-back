var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Liste des utilisateurs
 *    description: Retourne une liste d'utilisateurs
 *    responses:
 *      200:
 *        description: Un tableau d'utilisateurs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: L'ID de l'utilisateur
 *                  nom:
 *                    type: string
 *                    description: Le nom de l'utilisateur
 *            examples:
 *              - id: 1
 *                nom: User1
 *              - id: 2
 *                nom: User2
 */
router.get('/', function(req, res) {
  res.json([
    { id: 1, nom: 'User1' },
    { id: 2, nom: 'User2' }
  ]);
});

module.exports = router;
