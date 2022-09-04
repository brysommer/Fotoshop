const express = require('express');
const server = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const sharp = require('sharp');


server.set('view engine', 'ejs');
server.set('views', './views');


server.use(express.static('public'));


server.get('/', (req, res) => {
    res.render('main');
});

server.get('/item/:id, ')

server.listen(3000);