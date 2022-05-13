"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _inventory = require("../controllers/inventory.controllers");

var _verifyJWT = _interopRequireDefault(require("../middleware/verifyJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inventoryRouter = (0, _express.Router)();
inventoryRouter.route('/').get(_inventory.getItems).post(_inventory.addItem);
inventoryRouter.get('/me', _verifyJWT.default, _inventory.getLoggedInUserItems);
var _default = inventoryRouter;
exports.default = _default;