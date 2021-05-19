const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const db = require("./config/db");
const route = require("./routers");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env") });
const port = process.env.PORT || 3000;

// Midddleware
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Connect to database
db.connect();

// HTTP logger
app.use(morgan("combined"));

// Routers
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port} `);
});
