// Server Dependencies
const express = require('express');

// API Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

// Server Constants
const port = 3000;
const app = express();

// Logging Dependencies
const log4js = require('log4js');

// Logging Config
log4js.configure('./commons/config/log4js.json');
const logger = log4js.getLogger("app");

// Routes
const userRoutes = require('./users/routes.config');
const authRoutes = require('./auth/routes.config');

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, function() {
    logger.info("Server started on port " + 3000);
})