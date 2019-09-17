
var winston = require("winston");

var dateStringFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };

var customFormat = winston.format.printf(({ level, message, timestamp, stack }) => {

  stack = stack ? "\n" + stack : "";
  timestamp = new Date(timestamp).toLocaleDateString("us-EN", dateStringFormatOptions);

  return `${timestamp} [${level}] ${message}${stack}`;
});


module.exports = customFormat;