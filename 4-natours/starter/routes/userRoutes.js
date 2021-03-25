const express = require('express');
const userController = require('./../controller/userController');
const userRouter = express.Router();

userRouter
.route('/')
.get(userController.getAllUser)
.post(userController.createUser);

userRouter
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = userRouter;