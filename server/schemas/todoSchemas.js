const todoBodySchema = {
    type: 'object',
    required: ['title', 'description'],
    properties: {
        title: { type: 'string', minLength: 1, maxLength: 30 },
        description: { type: 'string', minLength: 1 },
    },
};

const todoResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' },
        title: { type: 'string' },
        description: { type: 'string' },
    },
};

module.exports = { todoBodySchema, todoResponseSchema, };