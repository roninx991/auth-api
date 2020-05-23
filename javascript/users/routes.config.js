// Express Dependency
const express = require('express');

// Creating Router
const router = express.Router();

// import User Controller
const UserController = require('./controllers/users.controller');

// import Commons Middleware
const ValidationMiddleware = require('../commons/middleware/auth.validation.middleware');
const PermissionMiddleware = require('../commons/middleware/auth.permission.middleware');

const PAID = 4;
const FREE = 1;
const ADMIN = 2048;

router.post('/', function(req, res) {
    UserController.insert(req, res);
});

 router.get('/', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    UserController.list
]);

router.get('/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.getById
]);

router.patch('/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.patchById
]);

router.delete('/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UserController.removeById
]);

module.exports = router