"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoggedInUserItems = exports.getItems = exports.addItem = void 0;

var _inventory = require("../models/inventory.model");

var _response = require("../utils/response");

const addItem = async (req, res) => {
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
  return res.json((0, _response.successResponse)(data));
};

exports.addItem = addItem;

const getItems = async (req, res) => {
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
    totalPage,
    prevPage: page <= 1 ? null : page - 1,
    nextPage: page >= totalPage ? null : page + 1,
    data
  };
  res.json((0, _response.successResponse)(results));
};

exports.getItems = getItems;

const getLoggedInUserItems = async (req, res) => {
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
  const totalData = await _inventory.Inventory.find().estimatedDocumentCount();
  const data = await _inventory.Inventory.find(query).skip((page - 1) * size).limit(size).exec();
  const totalPage = Math.ceil(totalData / size);
  const results = {
    currentPage: page,
    totalPage,
    prevPage: page <= 1 ? null : page - 1,
    nextPage: page >= totalPage ? null : page + 1,
    data
  };
  res.json((0, _response.successResponse)(results));
};

exports.getLoggedInUserItems = getLoggedInUserItems;