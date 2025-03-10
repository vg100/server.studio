const { Router } = require('express');
const UserController = require('../Controller/user.controller');
const GlobalMiddleWare = require('../MiddleWare/GlobalMiddleWare');


class UserRouter {

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.getRoutes();
        this.putRouter();
    }

    getRoutes() {
        this.router.get('/', GlobalMiddleWare.authenticate(["admin"]), UserController.getAllUser);
        this.router.get('/profile', GlobalMiddleWare.authenticate(["admin", "broker"]), UserController.getProfile);
    }

    postRoutes() {
        this.router.post('/createUser', GlobalMiddleWare.authenticate(["admin"]), UserController.createUser);
        this.router.post('/login', UserController.login);
    }
    putRouter() {
        this.router.put('/updateUser', GlobalMiddleWare.authenticate(["admin"]), UserController.updateUser);
    }
}

module.exports = new UserRouter().router;