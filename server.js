const http = require('http');
const app = require('./app');
const config = require('config')

const port = config.get('port');
const server = http.createServer(app);

server.listen(port);
if(server){
    console.log(`Server running port ${port}`);
} else {
    console.log('Server Error');
}