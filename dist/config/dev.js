"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
const config = {
  secrets: {
    jwt: process.env.ACCESS_TOKEN_SECRET || 'learneverything'
  },
  dbUrl: 'mongodb://localhost:27017/assignment11'
};
exports.config = config;