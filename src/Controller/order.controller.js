const Order = require("../Modals/order.modal");


class OrderController {
  static async getAllTaskByUserId(req, res, next) {
    try {
      const { userId } = req.user;

      const tasks = await Order.find({ userId }); // Fetch all tasks
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const task = await Order.findById(id);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  }

  static async createTaskByUserId(req, res, next) {
    try {
      const { title, description } = req.body;
      const { userId } = req.user;
      if (!title || !description) {
        return res.status(400).json({ success: false, message: "Title and Description are required" });
      }

      const newTask = new Order({ title, description, userId });
      await newTask.save();

      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      next(error);
    }
  }

  static async updateTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedTask = await Order.findByIdAndUpdate(id, { title, description }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTask = await Order.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
