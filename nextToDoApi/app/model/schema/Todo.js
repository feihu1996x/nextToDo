const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    userId: {
        type: String,
    },
    id: {
        type: String,
    },
    content: String,
    completed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: {}});

TodoSchema.statics = {
    async getTodo(userId) {
        return await this.find({
            userId: userId,
            deleted: false
        }, {
            userId: 0,
            _id: 0,
            deleted: 0,
            meta: 0,
            __v: 0,
        }, {
            sort: {
                createdAt: -1
            },
        })
    },
    async saveTodo(userId, content) {
        const todo = new Todo({
            userId,
            id: uuidv4(),
            content,
        });
        await todo.save();
        return [{
            id: todo.id,
            content: todo.content,
        }]
    },
    async deleteTodo(userId, id) {
        let todo = await this.findOne({
            userId: userId,
            id: id,
        });
        if (!todo) {
            let error = new Error('todo does not exist');
            error.status = 400;
            throw error;
        }
        todo.deleted = true;
        await todo.save();
        return [];
    },
    async patchTodo(userId, id, content, completed) {
        let todo = await this.findOne({
            userId: userId,
            id: id,
        });
        if (!todo) {
            let error = new Error('todo does not exist');
            error.status = 400;
            throw error
        }
        if (content) {
            todo.content = content;
        }
        if (completed || completed === false) {
            todo.completed = completed;
        }
        await todo.save();
        return [{
            id: todo.id,
            content: todo.content,
            completed: todo.completed
        }]
    }
};

const Todo = mongoose.model('Todo', TodoSchema, 'todos');
