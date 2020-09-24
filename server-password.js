const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    onAuth(auth, session, callback) {
      if (auth.username !== "abc" || auth.password !== "def") {
        return callback(new Error("Invalid username or password"));
      }
      callback(null, { user: 123 }); // where 123 is the user id or similar property
    }
  });