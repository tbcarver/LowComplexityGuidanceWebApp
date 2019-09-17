
var Transport = require("winston-transport");
var logsStore = require("../../../store/logsStore");

class SqliteTransport extends Transport {

  log(info, callback) {

    logsStore.addLog(info.message, info.url, info.username, info.stack, info.timestamp);
    callback();
  }
};


module.exports = SqliteTransport;