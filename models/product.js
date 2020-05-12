//import core node
const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

// remover este vetor para guardar as infos num arquivo
//const products = [];

//Global
const p = path.join(
        path.dirname(process.mainModule.filename), 
        'data', 
        'products.json'
    );

const getProductsFromFile = (cb) => {
    //const p = path.join(
    //    path.dirname(process.mainModule.filename), 
    //    'data', 
    //    'products.json'
    //);
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            //ao usar cb nao posso mais retornar o array
            //return [];
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
        //return JSON.parse(fileContent);
        //cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    
    save() {
        //cb nao eh necessario nessa, visto que a
        //logica aqui eh diferente
        getProductsFromFile(products => {
            //se o produto ja existe
            if (this.id) {
                console.log("Mateus");
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                });
            } else {
                //adicionar o id para cada produto ser unico
                console.log("Tiago");
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
        
        //essa primeira linha eh p o vetor que nao existe mais
        //products.push(this);

        //acabou sendo comentanda devido a inclusao da func auxiliar
        
        //dentro do join esta a linha que existia no util, para 
        //encontrar o diretorio onde salvarei e carregarei o file
        //'data' eh o diretorio, 'products' o arquivo        
        //const p = path.join(
        //    path.dirname(process.mainModule.filename), 
        //    'data', 
        //    'products.json'
        //);
        //fs.readFile(p, (err, fileContent) => {
        //    let products = [];
        //    if (!err) {
        //        products = JSON.parse(fileContent);
        //    }
        //    products.push(this);
        //    fs.writeFile(p, JSON.stringify(products), (err) => {
        //        console.log(err);
        //    });
        //});
    }
    
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            //const productIndex = products.findIndex(prod => prod.id === id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
    
    static fetchAll(cb) {
        getProductsFromFile(cb);
        
        //com a adicao da getProductsFromFile nao ha mais necessidade
        //deste trecho de codigo, pois foi p aquela funcao
        /*const p = path.join(
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
        });*/
        
        //nao mais necessario visto que nao ha mais o array
        //return products;
    }
    
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}