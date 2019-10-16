let http = require('http');
let appConfig = require('./config/app');
let routing = require('./src/helper/routing');
let messageManager = require('./src/helper/message-manager');

let server = http.createServer(function(req, res) {
    const data = routing(req.url, req.method, res)
});

let io = require('socket.io')(server);

server.listen(appConfig.port);

console.log('server started on port ' + appConfig.port);

io.on('connection', function(socket) {
    socket.on('new_message', function(data) {
        try {
            messageManager.create(data);
            socket.broadcast.emit('new_message', data);
        } catch(error) {
            console.log(error);
            socket.emit('error_message');
        }
    });
});
