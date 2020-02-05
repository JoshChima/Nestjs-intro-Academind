import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import uuid = require('uuid-random');

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const prodID = uuid()
        const newProduct = new Product(prodID, title, desc, price);
        this.products.push(newProduct);
        return prodID;
    }

    getAll() {
        //Json method makes a deep copy, no gateways into the products array
        return JSON.parse(JSON.stringify(this.products))
    }

    getSinleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product }
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product, }
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.desc = desc
        }
        if (price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string) {
        const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id == id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        return JSON.parse(JSON.stringify([product, productIndex]))
    }
}
