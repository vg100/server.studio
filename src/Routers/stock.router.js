const { Router } = require("express");
const StockController = require("../Controller/stock.controller");
const GlobalMiddleWare = require("../MiddleWare/GlobalMiddleWare");

class StockRouter {
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
            StockController.getStockByUserId
        );
        this.router.get(
            "/",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            StockController.getAllStock
        );
    }

    postRoutes() {
        this.router.post(
            "/",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            StockController.createStock
        );
    }

    putRoutes() {
        this.router.put(
            "/:id",
            GlobalMiddleWare.authenticate(["admin", "broker"]),
            StockController.updateStock
        );
    }

    deleteRoutes() {
        this.router.delete(
            "/:id",
            GlobalMiddleWare.authenticate(["admin"]),
            StockController.deleteStock
        );
    }
}

module.exports = new StockRouter().router;
