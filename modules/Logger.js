/*
Logger class for easy and aesthetically pleasing console logging 
*/
const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "[log]") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  switch (type) {
    case "[log]": {
      return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} ${chalk.cyan(content)} `);
    }
    case "[warn]": {
      return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content} `);
    }
    case "[error]": {
      return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content} `);
    }
    case "[debug]": {
      return console.log(`${timestamp} ${chalk.magenta(type.toUpperCase())} ${content} `);
    }
    case "[cmd]": {
      return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
    }
    case "[ready]": {
      return console.log(`${timestamp} ${chalk.white.bold.bgGreen(type.toUpperCase())} ${content}`);
    }
    case "[loaded]": {
      return console.log(`${timestamp} ${chalk.hex(`#008c00`)(type.toUpperCase())} ${content}`);
    }
    default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error." + Object.keys(type) + Object.keys(content));
  }

}; 

exports.error = (...args) => this.log(...args, "[error]");

exports.warn = (...args) => this.log(...args, "[warn]");

exports.debug = (...args) => this.log(...args, "[debug]");

exports.cmd = (...args) => this.log(...args, "[cmd]");

exports.ready = (...args) => this.log(...args, "[ready]");

exports.loaded = (...args) => this.log(...args, "[loaded]");