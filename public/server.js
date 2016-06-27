var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fallback = require('express-history-api-fallback');


var sockets = [];
var isServeSet = false;

var port = 3000;
var root = path.resolve(__dirname, 'static');

app.use(express.static(root));

app.get('/green', function (req, res) {
  if (isServeSet){
    emit({ type: 'INCREMENT', side: 'l' });
  }
  else {
    emit({ type: 'SET_SERVER', side: 'l' });
    isServeSet = true;
  }

    res.send('Hello left!');
});

app.get('/yellow', function (req, res) {
  if (isServeSet) {
    emit({ type: 'INCREMENT', side: 'r' });
  }
  else {
    emit({ type: 'SET_SERVER', side: 'r' });
    isServeSet = true;
  }

    res.send('Hello right!');
});

app.use(fallback('index.html', { root: root }));

const emit = (payload) => {
  console.log(`Emits ${payload.type}`);
  sockets.map((s) => {s.emit('action', payload)});
};

io.on('connection', function (socket) {
  console.log("Socket connected: " + socket.id);
  sockets.push(socket);
});

io.on('action', function(){
  console.log('action!');
});

server.listen(port, function () {
  console.log('Server running on port ' + port);
});
