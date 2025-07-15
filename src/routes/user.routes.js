const express = require('express');
const {createUser, userLogin, getUser, updateuser, createAnotherUser} = require('../controllers/user.controller');
const authentication = require('../middelwares/authentication');
const authorization = require('../middelwares/authorization')
const userRouter = express.Router();

userRouter.post('/signUp', createUser);
userRouter.post('/signup', createAnotherUser);

userRouter.post('/login',userLogin);
// userRouter.get('/auth', authentication, getUser);


module.exports = userRouter;
