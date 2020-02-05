import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }
    //you could also specifiy a specific parameter in @Body() exp: @Body('title') productTiele: string
    @Post()
    addProduct(
        @Body() completeBody: { title: string, desc: string, price: number }): any {
        const generatedID = this.productsService.insertProduct(completeBody.title, completeBody.desc, completeBody.price);
        return { id: generatedID };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getAll();
    }

    @Get(':id')
    getProduct(@Param('id') prodID: string) {
        return this.productsService.getSinleProduct(prodID);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string){
        this.productsService.deleteProduct(prodId);
        return null;
    }

}
