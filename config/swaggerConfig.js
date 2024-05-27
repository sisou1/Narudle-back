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
                        user: {
                            type: 'string',
                            description: "Nom de l'utilisateur"
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
                }
            }
        },
        paths: {
            '/games': {
                post: {
                    summary: 'Ajouter un game',
                    tags: ['Games'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'string',
                                            description: "Nom de l'utilisateur"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'Le game a été créé avec succès',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            characterName: {
                                                type: 'string',
                                                description: 'Le nom du personnage choisi'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: 'Une erreur est survenue lors de la création du game'
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
