"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

var _prepare = _interopRequireDefault(require("./prepare"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prompt = () => {
  try {
    const currentDir = (0, _path.basename)(process.cwd());
    let initOptions = {
      name: currentDir,
      functions: './src',
      dist: './dist'
    };
    let configFile = 'senzo.yml';
    console.log(_chalk.default.blueBright('********************************************************************************'));
    console.log(_chalk.default.blueBright('****                        Init Senzo Project                              ****'));
    console.log(_chalk.default.blueBright('****                                                                        ****'));
    console.log(_chalk.default.blueBright('****    The component system to rapidly develop Serverless applications     ****'));
    console.log(_chalk.default.blueBright('********************************************************************************'));

    const rl = _readline.default.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Project Name (${currentDir}): `, answer => {
      if (answer.length > 0) {
        initOptions.name = answer;
      }

      rl.question(`Source Code Location (${initOptions.functions}): `, answer => {
        if (answer.length > 0) {
          initOptions.functions = answer;
        }

        rl.question(`Distribution Location (${initOptions.dist}): `, answer => {
          if (answer.length > 0) {
            initOptions.dist = answer;
          }

          rl.question(`Configuration File Name (${configFile}): `, answer => {
            if (answer.length > 0) {
              configFile = answer;
            }

            rl.question(`Do you want to create a project with this configuration (Y/n)? `, answer => {
              if (answer.length > 0) {
                if (answer === 'n' | answer === 'N') {
                  initOptions = null;
                } else {
                  (0, _prepare.default)({
                    options: initOptions,
                    configFile
                  });
                }
              } else {
                (0, _prepare.default)({
                  options: initOptions,
                  configFile
                });
              }

              rl.close();
            });
          });
        });
      });
    });
    return {
      options: initOptions,
      configFile
    };
  } catch (error) {
    (0, _utils.logger)('error', `Initialisation aborted with errror: ${error}`);
    return false;
  }
};

var _default = prompt;
exports.default = _default;