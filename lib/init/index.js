"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prompt = _interopRequireDefault(require("./prompt"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = () => {
  let response = false;

  try {
    (0, _prompt.default)();
    response = true;
  } catch (error) {
    (0, _utils.logger)('error', `Unable to initialise project with error: ${error}`);
  }

  return true;
};

var _default = init;
exports.default = _default;