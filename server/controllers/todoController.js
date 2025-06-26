const db = require('../models');
const Model = db.Todo;

const getTodos = async (req, reply) => {
  try {
    const todos = await Model.findAll();
    return todos;
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Server error' });
  }
};

const createTodo = async (req, reply) => {
  try {
    const { title, description } = req.body;
    const newTodo = await Model.create({ title, description });
    reply.code(201).send(newTodo);
  } catch (err) {
    req.log.error(err);
    reply.code(400).send({ message: err.message });
  }
};

const getTodoById = async (req, reply) => {
  try {
    const todo = await Model.findByPk(req.params.id);
    if (!todo) return reply.code(404).send({ message: 'Not found' });
    return todo;
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Server error' });
  }
};

const updateTodo = async (req, reply) => {
  try {
    const { title, description } = req.body;
    const todo = await Model.findByPk(req.params.id);
    if (!todo) return reply.code(404).send({ message: 'Not found' });

    todo.title = title;
    todo.description = description;
    await todo.save();

    return todo;
  } catch (err) {
    req.log.error(err);
    reply.code(400).send({ message: err.message });
  }
};

const deleteTodo = async (req, reply) => {
  try {
    const todo = await Model.findByPk(req.params.id);
    if (!todo) return reply.code(404).send({ message: 'Not found' });

    await todo.destroy();
    reply.code(204).send();
  } catch (err) {
    req.log.error(err);
    reply.code(500).send({ message: 'Server error' });
  }
};

module.exports = { getTodos, createTodo, getTodoById, updateTodo, deleteTodo, };