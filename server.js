require ("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 6000;

const startServer = async () =>{
    try {
        await connectDB();

        const server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`CGKONNECT server running on port ${PORT}`)
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
}

startServer();