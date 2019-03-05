const express = require('express');
const router = express.Router();
const controller = require('../app/controller');

router.get('/', controller.Help.getHelp);
router.post('/user', controller.User.signUpValidator, controller.User.signUp);
router.put('/user', controller.User.signInValidator, controller.User.signIn);
router.get('/todo', controller.Todo.getTodo);
router.post('/todo', controller.Todo.postTodoValidator, controller.Todo.postTodo);
router.delete('/todo/:id', controller.Todo.deleteTodoValidator, controller.Todo.deleteTodo);
router.patch('/todo/:id', controller.Todo.patchTodo);

module.exports = router;
