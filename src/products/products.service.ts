import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import uuid = require('uuid-random');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class ProductsService {
    // private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title: title, 
            desc: desc, 
            price: price
        });
        // this.products.push(newProduct);
        const result =  await newProduct.save();
        return result.id as string;
    }

    async getAll() {
        const products = await this.productModel.find().exec();
        //console.log(products)
        //Json method makes a deep copy, no gateways into the products array
        //return JSON.parse(JSON.stringify(products))
        return products.map((prod) => ({id: prod.id, title: prod.title, desc: prod.desc, price: prod.price})) //reshapes the incoming data
    }

    async getSinleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {id: product.id, title: product.title, desc: product.desc, price: product.price}
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.desc = desc
        }
        if (price) {
            updatedProduct.price = price
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({_id: productId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find product')
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException('Could not find product')
        }
        if (!product) {
            throw new NotFoundException('Could not find product')
        }
        // return {id: product.id, title: product.title, desc: product.desc, price: product.price}
        return product
    }
}
