"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

var _response = require("../utils/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json((0, _response.errorResponse)("Unauthorized access"));
  }

  const token = authHeader.split(" ")[1];
  verify(token, _config.default.secrets.jwt, (err, decoded) => {
    if (err) {
      return res.status(403).json((0, _response.errorResponse)("Forbidden access"));
    }

    req.decoded = decoded;
    next();
  });
};

exports.default = _default;