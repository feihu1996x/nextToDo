const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    todoId: { type: Number, unique: true },
    content: String,
    completed: { type: Boolean, default: false },
}, { timestamps: {}, versionKey: false });

const Todo = mongoose.model('Todo', TodoSchema, 'todos');
