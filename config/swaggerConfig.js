// config/swaggerConfig.js

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Example',
            version: '1.0.0',
            description: 'Une API d\'exemple avec Express et Swagger',
        },
        components: {
            schemas: {
                Character: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID du personnage'
                        },
                        name: {
                            type: 'string',
                            description: 'Nom du personnage'
                        },
                        imageUrl: {
                            type: 'string',
                            description: 'URL de l\'image du personnage'
                        },
                        genre: {
                            type: 'string',
                            description: 'Genre du personnage'
                        },
                        affiliations: {
                            type: 'string',
                            description: 'Affiliations du personnage'
                        },
                        rang: {
                            type: 'string',
                            description: 'Rang du personnage'
                        },
                        chakra: {
                            type: 'string',
                            description: 'Chakra du personnage'
                        },
                        attributs: {
                            type: 'string',
                            description: 'Attributs du personnage'
                        },
                        arc: {
                            type: 'string',
                            description: 'Arc du personnage'
                        }
                    }
                },
                Game: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID du jeu'
                        },
                        id_user: {
                            type: 'integer',
                            description: 'ID de l\'utilisateur'
                        },
                        id_character: {
                            type: 'integer',
                            description: 'ID du personnage'
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création du jeu'
                        }
                    }
                },
                Try: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID du try'
                        },
                        id_game: {
                            type: 'integer',
                            description: 'ID du jeu'
                        },
                        id_character: {
                            type: 'integer',
                            description: 'ID du personnage'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID de l\'utilisateur'
                        },
                        pseudo: {
                            type: 'string',
                            description: 'Pseudo de l\'utilisateur'
                        },
                        mot_de_passe: {
                            type: 'string',
                            description: 'Mot de passe de l\'utilisateur'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de création de l\'utilisateur'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date de mise à jour de l\'utilisateur'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
