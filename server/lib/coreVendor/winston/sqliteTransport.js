
var Transport = require("winston-transport");
var logsStore = require("../../../store/logsStore");

class SqliteTransport extends Transport {

  log(info, callback) {

    logsStore.addLog(info.level, info.message, info.status, info.url, info.username, info.stack, info.timestamp);
    callback();
  }
};

module.exports = SqliteTransport;