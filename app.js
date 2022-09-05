const express = require('express');
const server = express();
const multer  = require('multer')
const storage = multer.memoryStorage();
const uploads = multer({storage});
const sharp = require('sharp');
const fs = require('fs');


server.set('view engine', 'ejs');
server.set('views', './views');


server.use(express.static('public'));


server.get('/', (req, res) => {
    res.render('main');
});



server.post('/stats', uploads.single('uploaded_file'), async function (req, res) {
    console.log('file', req.file);
    console.log('body', req.body);
  
    fs.access('uploads/resized/', (err) => {
        if(err){
            fs.mkdirSync('uploads/resized/')
        }
    });
    fs.access('uploads/original/', (err) => {
        if(err){
            fs.mkdirSync('uploads/original/')
        }
    });
    fs.writeFileSync('uploads/original/' +req.file.originalname, req.file.buffer, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    await sharp(req.file.buffer)
    .resize({width: 300, height: 200})
    .composite([{ input: './img/logo.png', gravity: 'center' }])
    .toFile('uploads/resized/' + req.file.originalname);
    res.send('submit succesfull');
 });

 server.get('/admin', (req, res) => {
    res.render('admin');
});


server.get('/item/:id, ')

server.listen(3000);