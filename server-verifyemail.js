const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    onMailFrom(address, session, callback) {
      if (address.address !== "allowed@example.com") {
        return callback(
          new Error("Only allowed@example.com is allowed to send mail")
        );
      }
      return callback(); // Accept the address
    }
  });