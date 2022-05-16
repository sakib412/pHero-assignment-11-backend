"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginController = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../config"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Login route
const loginController = async (req, res) => {
  const {
    email
  } = req.body;
  console.log(req.body);
  const access = (0, _jsonwebtoken.sign)({
    email
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
  return res.json((0, _response.successResponse)({
    accessToken: access
  }));
};

exports.loginController = loginController;