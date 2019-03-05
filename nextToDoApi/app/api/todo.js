const mongoose = require('mongoose');

exports.getTodo = async (userId) => {
    const Todo = mongoose.model('Todo');
    return await Todo.getTodo(userId);
};

exports.postTodo = async (userId, id, content) => {
    const Todo = mongoose.model('Todo');
    return await Todo.saveTodo(userId, id, content);
};

exports.deleteTodo = async (userId, id) => {
    const Todo = mongoose.model('Todo');
    return await Todo.deleteTodo(userId, id);
};

exports.patchTodo = async (userId, todoId, content, completed) => {
    const Todo = mongoose.model('Todo');
    return await Todo.patchTodo(userId, todoId, content, completed);
};