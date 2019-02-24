const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TodoSchema = new Schema({
    userId: {
        // type: ObjectId,
        // ref: 'User',
        type: String,
    },
    id: {
        type: Number,
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
    meta: {
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        }
    }
});

TodoSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now();
    } else {
        this.meta.updatedAt = Date.now();
    }
    next();
});

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
        })
    },
    async saveTodo(userId, id, content) {
        let todo = await this.findOne({
            userId: userId,
            id: id,
        });
        if (!todo) {
            todo = new Todo({
                userId,
                id,
                content,
            });
            await todo.save();
        }
        return [{
            id,
            content,
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
    }
};

const Todo = mongoose.model('Todo', TodoSchema, 'todos');
