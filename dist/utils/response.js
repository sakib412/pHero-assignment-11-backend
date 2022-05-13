"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponse = void 0;

const errorResponse = (message = "Something went worng, Please try again.") => {
  const results = {
    message
  };
  return {
    is_success: false,
    results
  };
};

exports.errorResponse = errorResponse;

const successResponse = (data = {}) => {
  return {
    is_success: true,
    results: data
  };
};

exports.successResponse = successResponse;