import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }
    //you could also specifiy a specific parameter in @Body() exp: @Body('title') productTiele: string
    @Post()
    async addProduct(
        @Body() completeBody: { 
            title: string, 
            desc: string, 
            price: number }) {
        const generatedID = await this.productsService.insertProduct(completeBody.title, completeBody.desc, completeBody.price);
        return { id: generatedID };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getAll();
        return products
    }

    @Get(':id')
    async getProduct(@Param('id') prodID: string) {
        const products = await this.productsService.getSinleProduct(prodID);
        return products;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }

}
