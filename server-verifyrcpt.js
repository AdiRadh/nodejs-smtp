const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    onRcptTo(address, session, callback) {
      if (address.address !== "allowed@example.com") {
        return callback(
          new Error("Only allowed@example.com is allowed to receive mail")
        );
      }
      return callback(); // Accept the address
    }
  });