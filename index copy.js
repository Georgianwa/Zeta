const express = require("express");
const connectDB = require("./config/dbConfig")
const userRoutes = require("./routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpec = require("./config/swaggerConfig");
const testEmailRoute = require("./routes/testEmailRoute");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDB();


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", testEmailRoute);

app.get("/", (req, res) => {
    res.render("index.ejs", {title: "Home Page"});
});


app.get("/test", (req, res) => {
    res.send("Testing the routes");
});


app.use("/api", userRoutes );


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




module.exports = app;
