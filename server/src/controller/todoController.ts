import { FastifyRequest, FastifyReply } from 'fastify';
import { Todo } from '../models';

export const getTodos = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const todos = await Todo.findAll();
        return todos;
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ message: 'Server error' });
    }
};

export const createTodo = async (req: FastifyRequest<{ Body: { title: string; description: string } }>, reply: FastifyReply) => {
    try {
        const { title, description } = req.body;
        const newTodo = await Todo.create({ title, description });
        reply.code(201).send(newTodo);
    } catch (err: any) {
        req.log.error(err);
        reply.code(400).send({ message: err.message });
    }
};

export const getTodoById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return reply.code(404).send({ message: 'Not found' });
        return todo;
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ message: 'Server error' });
    }
};

export const updateTodo = async (req: FastifyRequest<{ Params: { id: string }; Body: { title: string; description: string } }>, reply: FastifyReply) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return reply.code(404).send({ message: 'Not found' });
        
        todo.title = req.body.title;
        todo.description = req.body.description;
        await todo.save();

        return todo;
    } catch (err: any) {
        req.log.error(err);
        reply.code(400).send({ message: err.message });
    }
};

export const deleteTodo = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) return reply.code(404).send({ message: 'Not found' });

        await todo.destroy();
        reply.code(204).send();
    } catch (err) {
        req.log.error(err);
        reply.code(500).send({ message: 'Server error' });
    }
};