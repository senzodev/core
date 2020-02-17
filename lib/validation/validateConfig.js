"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

const validateConfig = options => {
  const functions = options.functions;

  if (functions) {
    if (!(0, _fs.existsSync)(functions)) {
      throw new Error(`Function location: ${functions} does not exist`);
    }
  }

  return true;
};

var _default = validateConfig;
exports.default = _default;