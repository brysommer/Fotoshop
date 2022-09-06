const fs = require('fs');

class Data{
    constructor(filename = 'galleries.json') {
        this.path = `./data/${filename}`;
        try {
            fs.readdirSync('data')
        } catch (error) {
            fs.mkdirSync('data')
        }
        try {
            fs.accessSync(this.path)
    
        } catch (error) {
            fs.writeFileSync(this.path, '[]')
        }       
    }
    createId(){
       return new Date().getTime().toString();
    }
    
    async create(list, id, imageName){

      const allData =await this.getAll();
 //     const id = this.createId();
      console.log(list.dirname);
      console.log(id);
      allData.push({ ...list, id, pictures: `/galleries/${list.dirname}/${imageName}` });
      await fs.promises.writeFile(this.path, JSON.stringify(allData, null, 2));
    };
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.path));
    }

    async getSingle(id) {
        const list = await this.getAll();
        return list.find(posts => posts.id === id);
    }
};


module.exports = Data;