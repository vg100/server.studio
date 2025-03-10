const { Router } = require('express');
const UserController = require('../Controller/user.controller');
const GlobalMiddleWare = require('../MiddleWare/GlobalMiddleWare');


class UserRouter {

    constructor() {
        this.router = Router();
        this.postRoutes();
    }

    postRoutes() {
        this.router.post('/createUser', GlobalMiddleWare.authenticate(["admin"]), UserController.createUser);
        this.router.post('/login', UserController.login);
    }
}

module.exports =  new UserRouter().router;