async function getTodos(request, reply) {
  return [{ id: 1, task: 'Write Fastify structure' }];
}

async function createTodo(request, reply) {
  const { task } = request.body;
  return { message: `Todo "${task}" created` };
}

module.exports = { getTodos, createTodo };