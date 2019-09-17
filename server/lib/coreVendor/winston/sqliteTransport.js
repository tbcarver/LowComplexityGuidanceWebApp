
var Transport = require('winston-transport');
const util = require('util');

class SqliteTransport extends Transport {

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service

    callback();
  }
};


module.exports = SqliteTransport;