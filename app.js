const express = require('express');
const server = express();
const multer  = require('multer')
const storage = multer.memoryStorage();
const uploads = multer({storage});
const sharp = require('sharp');
const fs = require('fs');
const Data = require('./createdata');
const imgPro = require('./imgpro');


server.set('view engine', 'ejs');
server.set('views', './views');


server.use(express.static('public'));


server.get('/', (req, res) => {
    res.render('main');
});



// const test = async () => {
//    const list = await gallery.getSingle('1662455579509');
//   console.log(list);
// }

// test();
// gallery.create({title: 'some title', content: 'some content'});



server.post('/stats', uploads.single('uploaded_file'), async function (req, res) {
    const gallery = new Data();
    const id = new Data().createId();
    const imageName = await imgPro(req, id);
    gallery.create(req.body, id, imageName);
    res.send('submit succesfull');
 });

 server.get('/admin', (req, res) => {
    res.render('admin');
});


server.get('/item/:id, ')

server.listen(3000);