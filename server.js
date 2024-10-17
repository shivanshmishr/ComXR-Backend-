const { app } = require("./app");
const chalk = require("chalk");

// Express App Setup
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
    console.log(chalk.yellowBright.bold(`Server is running on PORT: ${PORT} url on mode ${process.env.NODE_ENV}`));
});

// Handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
    console.log(chalk.bold.redBright(`Error: ${err.message}`));
    console.log(err);
    server.close(() => {
        console.log(
            chalk.bold.redBright(
                "Server closed due to unhandled promise rejection"
            )
        );
        process.exit(1);
    });
});

// Export the server instance
module.exports = server;