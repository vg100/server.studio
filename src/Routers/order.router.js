const { Router } = require('express');
const OrderController = require('../Controller/order.controller');
const GlobalMiddleWare = require('../MiddleWare/GlobalMiddleWare');


class OrderRouter {

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/', GlobalMiddleWare.authenticate, OrderController.getAllTaskByUserId);
        this.router.get('/:id', GlobalMiddleWare.authenticate, OrderController.getTaskById);
    }

    postRoutes() {
        this.router.post('/', GlobalMiddleWare.authenticate, OrderController.createTaskByUserId);
    }
    putRoutes() {
        this.router.put('/:id', GlobalMiddleWare.authenticate, OrderController.updateTaskById);
    }
    deleteRoutes() {
        this.router.delete('/:id', GlobalMiddleWare.authenticate, OrderController.deleteTaskById);
    }
}

module.exports = new OrderRouter().router;