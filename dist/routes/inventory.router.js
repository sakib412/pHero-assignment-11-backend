"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _inventory = require("../controllers/inventory.controllers");

const inventoryRouter = (0, _express.Router)();
inventoryRouter.route('/').get(_inventory.getItems).post(_inventory.addItem);
var _default = inventoryRouter;
exports.default = _default;