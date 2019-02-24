const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/', controller.Help.getHelp);
router.get('/todo', controller.Todo.getTodo);
router.post('/todo', controller.Todo.postTodoValidator, controller.Todo.postTodo);
router.delete('/todo/:id', controller.Todo.deleteTodoValidator, controller.Todo.deleteTodo);

module.exports = router;
