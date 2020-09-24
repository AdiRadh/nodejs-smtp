const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    size: 1024, // allow messages up to 1 kb
    onRcptTo(address, session, callback) {
      // do not accept messages larger than 100 bytes to specific recipients
      let expectedSize = Number(session.envelope.mailFrom.args.SIZE) || 0;
      if (address.address === "almost-full@example.com" && expectedSize > 100) {
        err = new Error("Insufficient channel storage: " + address.address);
        err.responseCode = 452;
        return callback(err);
      }
      callback();
    },
    onData(stream, session, callback) {
      stream.pipe(process.stdout); // print message to console
      stream.on("end", () => {
        let err;
        if (stream.sizeExceeded) {
          err = new Error("Message exceeds fixed maximum message size");
          err.responseCode = 552;
          return callback(err);
        }
        callback(null, "Message queued as abcdef");
      });
    }
  });