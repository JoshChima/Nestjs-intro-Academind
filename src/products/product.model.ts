import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
})

// npm i --save-dev @types/mongoose, then implement the extends to use mongoose functions in Product interface such as .save()
export interface Product extends mongoose.Document{
    id: string;
    title: string;
    desc: string;
    price: number;
}