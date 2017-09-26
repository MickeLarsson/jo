var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(7770, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:7770/');
});



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var fallback = require('express-history-api-fallback');

var sockets = [];
var isServeSet = false;

var port = 3000;
var root = path.resolve(__dirname, '');

app.use(express.static(root));

app.get('/left', function (req, res) {
  emit({ type: 'BTN_SINGLE', side: 'l' });
  res.send('Hello left!');
});

app.get('/left-double', function (req, res) {
  emit({ type: 'BTN_DOUBLE', side: 'l' });
  res.send('Hello left!');
});

app.get('/left-long', function (req, res) {
  emit({ type: 'BTN_LONG', side: 'l' });
  res.send('Hello right!');
});

app.get('/right', function (req, res) {
  emit({ type: 'BTN_SINGLE', side: 'r' });
  res.send('Hello right!');
});

app.get('/right-double', function (req, res) {
  emit({ type: 'BTN_DOUBLE', side: 'r' });
  res.send('Hello right!');
});

app.get('/right-long', function (req, res) {
  emit({ type: 'BTN_LONG', side: 'r' });
  res.send('Hello right!');
});

app.use(fallback('index.html', { root }));

const emit = (payload) => {
  console.log(`Emits ${payload.type}`);
  sockets.map((s) => {s.emit('action', payload)});
};

io.on('connection', function (socket) {
  console.log('Socket connected: ' + socket.id);
  sockets.push(socket);
});

io.on('action', function(){
  console.log('action!');
});

server.listen(port, function () {
  console.log('Server running on port ' + port);
});
