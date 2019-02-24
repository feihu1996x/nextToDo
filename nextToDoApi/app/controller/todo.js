const api = require('../api');
const { ResponseJson } = require('../lib').Response;
const { param, check, validationResult } = require('express-validator/check');

exports.getTodo = async (req, res) => {
    try {
        const data = await api.Todo.getTodo(req.user._id);
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], 'something is wrong', error.status || 500);
    }
};

exports.postTodo = async (req, res) => {
    try {
        const { id, content } = req.body;
        const data = await api.Todo.postTodo(req.user._id, id, content);
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], 'something went wrong', error.status || 500);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user._id;
        const data = await api.Todo.deleteTodo(userId, todoId);
        return ResponseJson(res, data);
    } catch (error) {
        console.error(error);
        return ResponseJson(res, [], 'something went wrong', error.status || 500);
    }
};

exports.postTodoValidator = [
    check('id').isDecimal(),
    check('content').isString(),
    endValidate
];

exports.deleteTodoValidator = [
    param('id').isDecimal(),
    endValidate,
];

function endValidate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.debug(errors.array());
        return ResponseJson(res, [], 'invalid parameter', 400);
    } else {
        next()
    }
}