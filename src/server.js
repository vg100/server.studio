const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const userRouter = require("./Routers/user.router");
const orderRouter = require("./Routers/order.router");
const stockRouter = require("./Routers/stock.router");

class Server {
  constructor() {
    this.app = express();
    this.setConfiguration();
    this.setRouter();
    this.error404Handler();
    this.handleErrors();
  }

  setConfiguration() {
    this.setCors();
    this.connectMongoDB();
  }

  setCors() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connectMongoDB() {
    const uri = "mongodb+srv://vg100:vg100@cluster0.bszog.mongodb.net/studio?retryWrites=true&w=majority"
    try {
      await mongoose.connect(uri);
      console.log(`Connected to database: ${mongoose.connection.name}`);
    } catch (error) {
      console.log('Database connection error:', error.message);
    }
  }

  setRouter() {
    this.app.get('/', (req, res) => {
      res.send({
        name: "studio",
        status: "UP",
      });
    });

    this.app.use('/auth', userRouter);
    this.app.use('/order', orderRouter);
    this.app.use('/stock', stockRouter);
  }


  handleErrors() {
    this.app.use((error, req, res, next) => {
      console.error(error.stack);
      const errorStatus = req.status || (error.response ? error.response.status : 500)
      const errorMessage = error.message || (error.response ? error.response.message : 'Internal Server Error');
      const errorObject = {
        message: errorMessage,
        status_code: errorStatus,
      };
      console.log(errorObject);
      res.status(errorStatus).json(errorObject);
    });
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not Found',
        status_code: 404,
      });
      console.warn(`404 error - Not Found: ${req.originalUrl}`);
    });
  }
}

module.exports = Server;

