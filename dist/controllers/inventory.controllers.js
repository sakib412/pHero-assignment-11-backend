"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItemStock = exports.getSingleItem = exports.getLoggedInUserItems = exports.getItems = exports.deleteItem = exports.addItem = void 0;

var _inventory = require("../models/inventory.model");

var _response = require("../utils/response");

const addItem = async (req, res) => {
  try {
    const {
      name,
      image,
      quantity,
      supplier,
      price,
      description,
      email
    } = req.body;
    const item = {
      name,
      image,
      quantity,
      supplier,
      price,
      description,
      email
    };
    const data = await _inventory.Inventory.create(item);
    return res.status(201).json((0, _response.successResponse)(data));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.addItem = addItem;

const getItems = async (req, res) => {
  try {
    let {
      page = 1,
      size = 10
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const query = {};
    const totalData = await _inventory.Inventory.find().estimatedDocumentCount();
    const data = await _inventory.Inventory.find(query).skip((page - 1) * size).limit(size).exec();
    const totalPage = Math.ceil(totalData / size);
    const results = {
      currentPage: page,
      totalData,
      totalPage,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= totalPage ? null : page + 1,
      data
    };
    return res.json((0, _response.successResponse)(results));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.getItems = getItems;

const getLoggedInUserItems = async (req, res) => {
  try {
    const {
      email
    } = req.decoded;
    let {
      page = 1,
      size = 10
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const query = {
      email
    };
    const totalData = await _inventory.Inventory.countDocuments(query);
    const data = await _inventory.Inventory.find(query).skip((page - 1) * size).limit(size).exec();
    const totalPage = Math.ceil(totalData / size);
    const results = {
      currentPage: page,
      totalPage,
      totalData,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= totalPage ? null : page + 1,
      data
    };
    return res.json((0, _response.successResponse)(results));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.getLoggedInUserItems = getLoggedInUserItems;

const getSingleItem = async (req, res) => {
  try {
    const item = await _inventory.Inventory.findById(req.params.id).exec();
    if (!item) return res.status(404).json((0, _response.errorResponse)("Not found"));
    return res.json((0, _response.successResponse)(item));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.getSingleItem = getSingleItem;

const updateItemStock = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      quantity
    } = req.body;
    const result = await _inventory.Inventory.findByIdAndUpdate(id, {
      $inc: {
        quantity: Number(quantity)
      }
    }, {
      new: true
    });
    return res.json((0, _response.successResponse)(result));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.updateItemStock = updateItemStock;

const deleteItem = async (req, res) => {
  try {
    const inventory = await _inventory.Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(400).json((0, _response.errorResponse)("The item you are trying to delete is not found."));
    return res.status(204).json((0, _response.successResponse)("Succesfully deleted."));
  } catch (err) {
    return res.status(500).json((0, _response.errorResponse)(err));
  }
};

exports.deleteItem = deleteItem;