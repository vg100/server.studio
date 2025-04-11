const Stock = require("../Modals/stock.modal");

class StockController {

  static async getAllStock(req, res, next) {
    try {
      const stocks = await Stock.find();
      if (stocks.length === 0) {
        return res.status(404).json({ message: "No stocks found" });
      }
      res.status(200).json(stocks);
    } catch (error) {
      next(error);
    }
  }

  // Get Stock by ID
  static async getStockByUserId(req, res, next) {
    try {
      const stock = await Stock.find({userId:req.params.id});
      if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
      }
      res.status(200).json(stock);
    } catch (error) {
      next(error)
    }
  }

  // Create Stock
  static async createStock(req, res, next) {
    try {
      const newStock = new Stock({
        userId:req.user.userId,
        ...req.body
      });

      await newStock.save();
      res.status(201).json({ message: "Stock created successfully", order: newStock });
    } catch (error) {
      next(error)
    }
  }

  // Update Stock
  static async updateStock(req, res, next) {
    try {
        const { id } = req.params;
    
        const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedStock) {
            return res.status(404).json({ message: "Stock not found" });
        }

        res.status(200).json({ message: "Stock updated successfully", order: updatedStock });
    } catch (error) {
        next(error);
    }
}

  // Delete Order
  static async deleteStock(req, res, next) {
    try {
      const deletedStock = await Stock.findByIdAndDelete(req.params.id);
      if (!deletedStock) {
        return res.status(404).json({ message: "Stock not found" });
      }

      res.status(200).json({ message: "Stock deleted successfully" });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = StockController;
