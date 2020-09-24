const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
  secure: true,
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("server.crt")
});
server.listen(465);

//error handling
server.on("error", err => {
    console.log("Error %s", err.message);
  });

//server.listen(port[,host][,callback]);

