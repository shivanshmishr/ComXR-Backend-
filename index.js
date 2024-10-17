// Load env Variables
if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");
    dotenv.config({path: "src/config/env/config.env"});
} else {
    require("dotenv").config();
}

const server = require("./server");

// Access the server instance
server.on("listening", () => {
    console.log(`Cluster ==========> Server ${process.pid} is running`);
});
