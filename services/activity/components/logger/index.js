var winston = require('winston');
var moment = require('moment');
const jsonStringify = require('fast-safe-stringify');
const _ = require('lodash');
const winston_daily = require('winston-daily-rotate-file');
const config = require('config');

var custom = winston.format((info, opts) => {
  function buildMsg(message) {
    return {
      time: moment().format("DD, MMM YYYY, HH:mm:ss SSSS"), // "day of month number, month year, hour:min:sec Fractional sec
      pid: process.pid,
      message
    };
  }

  function replaceErrors(key, value) {
    if (value instanceof Error) {
      var error = {};

      Object.getOwnPropertyNames(value).forEach(function(key) {
        error[key] = value[key];
      });
      if (error.stack) {
        error.stack = error.stack.replace(/\s\s+/g, ' ').replace(/[\\]/g, '/');
      }
      return error;
    }

    return value;
  }

  info.message = jsonStringify(info.message, replaceErrors);
  try {
    var temp = JSON.parse(info.message);
    info.message = buildMsg(temp);
  } catch (_e) {
    info.message = buildMsg(info);
  }
  return info
});

function createLogger(level, folderName, levels, colors) {
  var opts = {
    level: level,
    format: winston.format.combine(
      custom(),
      winston.format.json()
    ),
    transports: [
      // - Write to all logs with level `info` and below to `combined.log` 
      new winston_daily({
        filename: `${folderName}/info`,
        localTime: true,
        timestamp: new Date(),
        zippedArchive: true,
        maxsize: 10000000
      }),

      // - Write all logs error (and below) to `error.log`.
      new winston_daily({
        filename: `${folderName}/error`,
        level: 'error',
        localTime: true,
        timestamp: new Date(),
        zippedArchive: true,
        maxsize: 10000000
      }),

      // - Write to console
      new winston.transports.Console({
        level: "debug",
        colorize: true
      })
    ]
  };
  if (levels) opts.levels = levels;
  if (colors) winston.addColors(colors)
  return winston.createLogger(opts);
}

var colors = {
  info: "white",
  error: "red",
  warning: "cyan",
  debug: "yellow"
};

var logPath = 'logs' /// to change
if (process.platform === 'win32') {
  logPath = 'logs';
}

if (process.env.NODE_ENV === 'staging') {
  logPath = 'logs';
}

if (['prod','ntt'].includes(process.env.NODE_ENV)) {
  logPath = config.logPath;
}
console.log(`Logs Path: ${logPath}`);

module.exports = {
  logger: createLogger('info', `${logPath}`, null, colors),
  // logger: createLogger('audit', 'logs/audit',{audit:0})
};