"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
const config = {
  env: 'production',
  secrets: {
    jwt: process.env.ACCESS_TOKEN_SECRET,
    // must set secret otherwise fails
    jwtExp: process.env.TOKEN_LIFETIME
  },
  dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyy8w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
};
exports.config = config;