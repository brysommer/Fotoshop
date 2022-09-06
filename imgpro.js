const fs = require('fs');
const sharp = require('sharp');

const imgPro = async (req, id) => {
    dirName = req.body.dirname;
    console.log(dirName);
  
    fs.access(`public/galleries/${dirName}`, (err) => {
        if(err){
            fs.mkdirSync(`public/galleries/${dirName}`)
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
    try {
        await sharp(req.file.buffer)
        .resize({width: 300, height: 200})
        .composite([{ input: './img/logo.png', gravity: 'center' }])
        .toFile(`public/galleries/${dirName}/` + req.file.originalname);

    } catch (error) {
        console.log('Error imgPro', error);
    }
    return fileName = req.file.originalname;
    
}

module.exports = imgPro;