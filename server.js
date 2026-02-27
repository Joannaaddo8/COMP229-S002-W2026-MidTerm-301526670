let configDB = require('./config/db');
let app = require("./config/express");
let http = require('http');

configDB().catch(console.dir);
var server = http.createServer(app);

server.on('listening', onListening);
const PORT = process.env.PORT || 3000;

server.listen(PORT);

function onListening(){
  console.log(`Server running on port ${PORT}`);
}
