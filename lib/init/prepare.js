"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../utils");

var _fs = require("fs");

var _path = require("path");

var _validation = require("../validation");

var _yaml = _interopRequireDefault(require("yaml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prepare = ({
  options,
  configFile
}) => {
  try {
    const configValid = (0, _validation.validateConfig)(options);

    if (configValid) {
      const functions = options.functions;
      const functionsDir = (0, _path.join)(process.cwd(), functions);

      if (!(0, _fs.existsSync)(functionsDir)) {
        (0, _fs.mkdirSync)(functionsDir, {
          recursive: true
        });
        (0, _utils.logger)('info', `init: Functions directory created`);
      } else {
        (0, _utils.logger)('warning', `init: Functions directory exists`);
      }

      const fullConfig = (0, _path.join)(process.cwd(), configFile);

      if (!(0, _fs.existsSync)(fullConfig)) {
        (0, _fs.writeFileSync)(fullConfig, _yaml.default.stringify(options));
      } else {
        (0, _utils.logger)('error', `${fullConfig} already exists.`);
      }

      (0, _utils.logger)('info', `Project config and scaffolding created.`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    (0, _utils.logger)('error', `init project error: ${error}`);
    return false;
  }
};

var _default = prepare;
exports.default = _default;