let http = require('http');
let appConfig = require('./config/app');
let routing = require('./src/helper/routing');
let messageManager = require('./src/helper/message-manager');

let server = http.createServer(function(req, res) {
    const data = routing(req.url, req.method, res)
});

let io = require('socket.io')(server);

server.listen(appConfig.port);

let users = [];

console.log('server started on port ' + appConfig.port);

io.on('connection', function(socket) {
    socket.on('new_message', function(data) {
        try {
            messageManager.create(data);
            io.emit('new_message', data);
        } catch(error) {
            console.log(error);
            socket.emit('error_message');
        }
    });

    socket.on('user_join', function(data) {
        users.push(data.pseudo);

        socket.pseudo = data.pseudo;
        io.emit('user_join', data);
    });

    socket.on('user_left', function() {
        users.splice(users.indexOf(data.pseudo), 1);

        io.emit('user_left', {pseudo: socket.pseudo});
    });

    socket.on('disconnect', function() {
        users.splice(users.indexOf(data.pseudo), 1);

        io.emit('user_left', {pseudo: socket.pseudo});
    });

    socket.emit('connection_init', users);
});
