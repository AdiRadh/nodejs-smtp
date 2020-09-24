const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    lmtp: true,
    onData(stream, session, callback) {
      stream.pipe(process.stdout); // print message to console
      stream.on("end", () => {
        // reject every other recipient
        let response = session.envelope.rcptTo.map((rcpt, i) => {
          if (i % 2) {
            return new Error("<" + rcpt.address + "> Not accepted");
          } else {
            return "<" + rcpt.address + "> Accepted";
          }
        });
        callback(null, response);
      });
    }
  });