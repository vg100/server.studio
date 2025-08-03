const Order = require("../Modals/order.modal");
const Stock = require("../Modals/stock.modal");

class OrderController {

  static async getAllOrder(req, res, next) {
    try {
      const orders = await Order.find()
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // Get Order by ID
  static async getOrderByUserId(req, res, next) {
    try {
      const order = await Order.find({ userId: req.params.id });
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
      const { equipment } = req.body;
      const newOrder = new Order({
        userId: req.user.userId,
        ...req.body
      });

      for (const item of equipment) {
        await Stock.updateOne(
          { _id: item.item },
          {
            $inc: { stock: -item.qty },
            $set: { status: "Rented Out" }
          }
        );
      }
      await newOrder.save();
      res.status(201).json({message: "Order created successfully",order: newOrder});
    } catch (error) {
      next(error);
    }
  }
  

  // Update Order
  static async updateOrder(req, res, next) {
    try {
      const { id } = req.params;

      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      next(error);
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

  static async returnProduct(req, res, next) {

    try {

      const { bookingId, equipmentId } = req.body;
      const booking = await Order.findById(bookingId);
      if (!booking) return res.status(404).json({ error: 'Booking not found' });

      const item = booking.equipment.find(eq => eq.item.toString() === equipmentId);
      if (!item) return res.status(404).json({ error: 'Equipment not found in this booking' });

      if (item.status === 'Returned') {
        return res.status(400).json({ error: 'Equipment already returned' });
      }

      item.status = 'Returned';
      await booking.save();

      await Stock.findByIdAndUpdate(equipmentId, { status: 'Available' });

      res.json({ message: 'Equipment returned successfully' });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrderController;
