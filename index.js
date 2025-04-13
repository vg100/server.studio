
const os = require("os");
const Server = require("./src/server");
const numCPUs = os.cpus().length;

const server = new Server();
server.start();