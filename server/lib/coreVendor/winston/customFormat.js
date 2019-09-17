
var winston = require("winston");

var dateStringFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };

var customFormat = winston.format.printf(({ level, message, timestamp, stack, url }) => {

  timestamp = new Date(timestamp).toLocaleDateString("us-EN", dateStringFormatOptions);
  stack = stack ? "\n" + stack : "";
  url = url ? ` [${url}]` : "";

  return `${timestamp} [${level}]${url} ${message}${stack}`;
});


module.exports = customFormat;