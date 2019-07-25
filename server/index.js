const server = require("./server");
const PORT = process.env.PORT || 3000;
server.listen(PORT,'0.0.0.0',() => console.log('server is listening on port 3000'));