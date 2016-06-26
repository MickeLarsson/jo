var express = require('express');
var path = require('path');
var fallback = require('express-history-api-fallback')
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = 3000;//isProduction ? process.env.PORT : 3000;
var root = path.resolve(__dirname, 'public');

// We point to our static assets
app.use(express.static(root));

app.use(fallback('index.html', { root: root }));

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});



