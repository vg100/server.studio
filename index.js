
const os = require("os");


const Server = require("./src/server");


const numCPUs = os.cpus().length;
const PORT = 5000;

const app = new Server().app;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
