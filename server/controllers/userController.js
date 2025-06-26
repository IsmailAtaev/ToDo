async function getUsers(request, reply) {
  return [{ id: 1, name: 'Malik' }];
}

async function createUser(request, reply) {
  const { name } = request.body;
  return { message: `User ${name} created` };
}

module.exports = { getUsers, createUser };