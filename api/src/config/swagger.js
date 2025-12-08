/**
 * Swagger Configuration
 * 
 * Define documentação e configuração da API para Swagger UI
 * Equivalente ao Swagger/OpenAPI configuration do .NET
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API EASY-Tarefas',
            version: '1.0.0',
            description: 'API RESTful para gerenciamento de tarefas e projetos. Refatorada com arquitetura C# .NET em JavaScript.',
            contact: {
                name: 'Mateus Souza e Silva',
                email: 'mateus@email.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desenvolvimento'
            },
            {
                url: 'https://api.easy-tarefas.com',
                description: 'Servidor de produção'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token'
                }
            },
            schemas: {
                LoginDto: {
                    type: 'object',
                    required: ['email', 'senha'],
                    properties: {
                        email: {
                            type: 'string',
                            example: 'user@example.com',
                            minLength: 5
                        },
                        senha: {
                            type: 'string',
                            example: 'password123',
                            minLength: 5
                        }
                    }
                },
                CriarProjetoDto: {
                    type: 'object',
                    required: ['titulo', 'descricao', 'idUsuarioDono'],
                    properties: {
                        titulo: {
                            type: 'string',
                            example: 'Novo Projeto',
                            minLength: 10,
                            maxLength: 100
                        },
                        descricao: {
                            type: 'string',
                            example: 'Descrição do projeto'
                        },
                        idUsuarioDono: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },
                CriarTarefaDto: {
                    type: 'object',
                    required: ['titulo', 'descricao', 'idProjeto'],
                    properties: {
                        titulo: {
                            type: 'string',
                            example: 'Nova Tarefa',
                            minLength: 5
                        },
                        descricao: {
                            type: 'string',
                            example: 'Descrição da tarefa'
                        },
                        idProjeto: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },
                Projeto: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        titulo: {
                            type: 'string',
                            example: 'Desenvolvimento de Sistema Web'
                        },
                        descricao: {
                            type: 'string',
                            example: 'Sistema completo de gerenciamento'
                        },
                        status: {
                            type: 'string',
                            example: 'Ativo',
                            enum: ['Ativo', 'Concluído', 'Cancelado']
                        },
                        data_inicio: {
                            type: 'string',
                            format: 'date',
                            example: '2025-01-01'
                        },
                        data_fim: {
                            type: 'string',
                            format: 'date',
                            example: '2025-06-30'
                        },
                        id_usuario_dono: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },
                Tarefa: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        titulo: {
                            type: 'string',
                            example: 'Implementar autenticação'
                        },
                        descricao: {
                            type: 'string',
                            example: 'Implementar JWT'
                        },
                        status: {
                            type: 'string',
                            example: 'Pendente',
                            enum: ['Pendente', 'Em Andamento', 'Concluída']
                        },
                        id_projeto: {
                            type: 'integer',
                            example: 1
                        }
                    }
                },
                Comentario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        texto: {
                            type: 'string',
                            example: 'Excelente trabalho!'
                        },
                        id_tarefa: {
                            type: 'integer',
                            example: 1
                        },
                        id_usuario: {
                            type: 'integer',
                            example: 1
                        },
                        data: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-12-07T23:38:56'
                        }
                    }
                },
                Response: {
                    type: 'object',
                    properties: {
                        sucesso: {
                            type: 'boolean',
                            example: true
                        },
                        dados: {
                            type: 'object'
                        },
                        mensagem: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/index.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
