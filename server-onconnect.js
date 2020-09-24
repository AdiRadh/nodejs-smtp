const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    onConnect(session, callback) {
      if (session.remoteAddress === "127.0.0.1") {
        return callback(new Error("No connections from localhost allowed"));
      }
      return callback(); // Accept the connection
    }
  });