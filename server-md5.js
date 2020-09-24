const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authMethods: ["CRAM-MD5"], // CRAM-MD5 is not enabled by default
    onAuth(auth, session, callback) {
      if (auth.method !== "CRAM-MD5") {
        // should never occur in this case as only CRAM-MD5 is allowed
        return callback(new Error("Expecting CRAM-MD5"));
      }
  
      // CRAM-MD5 does not provide a password but a challenge response
      // that can be validated against the actual password of the user
      if (auth.username !== "abc" || !auth.validatePassword("def")) {
        return callback(new Error("Invalid username or password"));
      }
  
      callback(null, { user: 123 }); // where 123 is the user id or similar property
    }
  });