var express = require('express');
var app = express();

app.use(express.static(__dirname)); //serves the index.html

//configure port variable to run on both cloud service (e.g. Azure) and locally
var port = process.env.PORT || 3000;

app.listen(port); //listens on port 3000 -> http://localhost:3000/