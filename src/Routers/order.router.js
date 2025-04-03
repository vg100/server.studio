const { Router } = require("express");
const OrderController = require("../Controller/order.controller");
const GlobalMiddleWare = require("../MiddleWare/GlobalMiddleWare");

class OrderRouter {
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get(
            "/:id",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            OrderController.getOrderByUserId
        );
        this.router.get(
            "/",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            OrderController.getAllOrder
        );
    }

    postRoutes() {
        this.router.post(
            "/",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            GlobalMiddleWare.checkPermissions(["canCreateOrders"]),
            OrderController.createOrder
        );
    }

    putRoutes() {
        this.router.put(
            "/:id",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            GlobalMiddleWare.checkPermissions(["canEditOrders"]),
            OrderController.updateOrder
        );
    }

    deleteRoutes() {
        this.router.delete(
            "/:id",
            GlobalMiddleWare.authenticate(["admin"]),
            GlobalMiddleWare.checkPermissions(["canDeleteOrders"]),
            OrderController.deleteOrder
        );
    }
}

module.exports = new OrderRouter().router;
