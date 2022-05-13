"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inventory = void 0;

var _mongoose = require("mongoose");

var _collectionName = require("./collectionName");

const InventorySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  quantity: {
    type: Number,
    required: true
  },
  supplier: String,
  price: {
    type: Number,
    required: true
  },
  email: String
}, {
  timestamps: true
});
const Inventory = (0, _mongoose.model)(_collectionName.INVENTORY, InventorySchema);
exports.Inventory = Inventory;