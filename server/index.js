var express = require('express'); //usamos a express
var app = express(); //instanciamos su metodo
var server = require('http').Server(app); //utilizamos http y le mandamos express
var io = require('socket.io')(server); //pasamos server a socket.io

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvendio al CHAT ESCOLAR',
    nickname: 'IN-TECH'
}];

io.on('connection', function(socket){
    console.log("alguien se ha conectado"+socket.handshake.address);
    socket.emit('messages', messages);
    socket.on('add-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function(){
    console.log("servidor funcionando en http://localhost:6677");
}); //puerto


