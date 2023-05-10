// const fs = require('fs');
import fs from "fs";


export default class ProductManager {
    constructor(path) {
        this.path = path;
    }
    addProduct(product) {
        const products = this.getProducts();
        const lastProduct = products[products.length - 1];
        const id = lastProduct ? lastProduct.id + 1 : 1;
        const newProduct = { ...product, id };
        products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(products));
        return newProduct;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path);
            return JSON.parse(data.toString());
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        let products = this.getProducts();
        let product = products.find((p) => p.id === id);
        if (!product) {
            // throw new Error(`Product with id ${id} not found`);
            console.log(`Product with id ${id} not found`);
        }
        return product;
    }

    updateProduct(id, updates) {
        const products = this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`Product with id ${id} not found`);
        }
        const updatedProduct = { ...products[index], ...updates, id };
        products[index] = updatedProduct;
        fs.writeFileSync(this.path, JSON.stringify(products));
        return updatedProduct;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`Product with id ${id} not found`);
        }
        products.splice(index, 1);
        fs.writeFileSync(this.path, JSON.stringify(products));
    }
    deletePath(path){
        fs.unlink(`${path}`, (err) => {
            if (err) throw err;
            console.log('File was deleted');
        });
    }
}

// const path = 'products.json';
// const productManager = new ProductManager(path);

// Test addProduct
/* const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
};
const newProduct2 = {
    title: 'producto prueba número 2',
    description: 'Este es un producto prueba número 2',
    price: 400,
    thumbnail: 'Sin imagen',
    code: 'abc1235',
    stock: 25,
};
const newProduct3 = {
    title: 'producto pruebab número 3',
    description: 'Este es un producto prueba número 3',
    price: 700,
    thumbnail: 'Sin imagen',
    code: 'abc1253',
    stock: 25,
};
const addedProduct = productManager.addProduct(newProduct);
console.log('Added product:', addedProduct); */

// Test getProducts
// const products = productManager.getProducts();
// console.log('All products:', products);

// Test getProductById
/* const idToFind = addedProduct.id;
const foundProduct = productManager.getProductById(idToFind);
console.log(`Product with id ${idToFind}:`, foundProduct); */

// Test updateProduct
/* const updateFields = { title: 'Nuevo título' };
const updatedProduct = productManager.updateProduct(idToFind, updateFields);
console.log(`Updated product with id ${idToFind}:`, updatedProduct); */

// Test deleteProduct
// productManager.deleteProduct(idToFind);
// productManager.deleteProduct(6);
// console.log(`Deleted product with id ${idToFind}`);
// console.log('deletePath() :>> ', productManager.deletePath('products.json'));
// module.exports = ProductManager;