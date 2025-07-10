const express = require('express');
const {createUser, userLogin, getUser, updateUser} = require('../controllers/user.controller');
const userRouter = express.Router();
userRouter.post('/signUp', createUser);
userRouter.post('/login',userLogin);
userRouter.get('/auth', getUser);
userRouter.put("/edit:id",updateUser);
module.exports = userRouter;
