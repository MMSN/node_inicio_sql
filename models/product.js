//import core node
const fs = require('fs');
const path = require('path');

// remover este vetor para guardar as infos num arquivo
//const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    
    save() {
        //essa primeira linha eh p o vetor que nao existe mais
        //products.push(this);
        
        //dentro do join esta a linha que existia no util, para 
        //encontrar o diretorio onde salvarei e carregarei o file
        //'data' eh o diretorio, 'products' o arquivo
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    
    static fetchAll(cb) {
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                //ao usar cb nao posso mais retornar o array
                //return [];
                cb([]);
                
            }
            //return JSON.parse(fileContent);
            cb(JSON.parse(fileContent));
        });
        
        //nao mais necessario visto que nao ha mais o array
        //return products;
    }
}