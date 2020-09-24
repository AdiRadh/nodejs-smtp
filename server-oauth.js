const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
    authMethods: ["XOAUTH2"], // XOAUTH2 is not enabled by default
    onAuth(auth, session, callback) {
      if (auth.method !== "XOAUTH2") {
        // should never occur in this case as only XOAUTH2 is allowed
        return callback(new Error("Expecting XOAUTH2"));
      }
      if (auth.username !== "abc" || auth.accessToken !== "def") {
        return callback(null, {
          data: {
            status: "401",
            schemes: "bearer mac",
            scope: "my_smtp_access_scope_name"
          }
        });
      }
      callback(null, { user: 123 }); // where 123 is the user id or similar property
    }
  });