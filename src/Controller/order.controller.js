const Order = require("../Modals/order.modal");

class OrderController {
  // Get Order by ID
  static async getOrderById(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      next(error)
    }
  }

  // Create Order
  static async createOrder(req, res, next) {
    try {
      const newOrder = new Order({
        userId:req.user.userId,
        ...req.body
      });

      await newOrder.save();
      res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      next(error)
    }
  }

  // Update Order
  static async updateOrder(req, res, next) {
    try {
      const { title, description, price } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { title, description, price },
        { new: true } // Return updated order
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      next(error)
    }
  }

  // Delete Order
  static async deleteOrder(req, res, next) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController;
