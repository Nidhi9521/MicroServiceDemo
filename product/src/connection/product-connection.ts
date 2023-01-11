import mongoose from 'mongoose';
import { ProductDoc, ProductModel, ProductSchema } from '../model/product';

let productMongoCon: mongoose.Connection;
let Product: ProductModel;

export function mongoProductCon(uri: string) {
    console.log("uri: ", uri);
    
    productMongoCon = mongoose.createConnection(uri);
    Product = productMongoCon.model<ProductDoc, ProductModel>('product', ProductSchema);

}

export { productMongoCon, Product };