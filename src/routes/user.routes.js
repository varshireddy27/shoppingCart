const express = require('express');
const {createUser, userLogin, getUser, updateuser} = require('../controllers/user.controller');
const authentication = require('../middelwares/authentication');
const authorization = require('../middelwares/authorization')
const userRouter = express.Router();

userRouter.post('/signUp', createUser);
userRouter.post('/login',userLogin);
userRouter.put('/', updateuser);
userRouter.get('/auth', authentication, getUser);


module.exports = userRouter;
