// Express Dependency
const express = require('express');

// Creating Router
const router = express.Router();

// Middleware User Validation
const VerifyUserMiddleware = require('./middlewares/verify.middleware.user');

// import Auth Controller
const AuthorizationController = require('./controllers/login.controller');

router.post('/', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login
]);

module.exports = router;