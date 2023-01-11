import mongoose from 'mongoose';
import { ProductDoc, ProductModel, ProductSchema } from '../model/product';


let centralMongoCon: mongoose.Connection;
let Product: ProductModel;

export function mongoCentralCon(uri: string) {
    console.log("uri: ", uri);
    
    centralMongoCon = mongoose.createConnection(uri);
    Product = centralMongoCon.model<ProductDoc, ProductModel>('product', ProductSchema);
}

export { centralMongoCon, Product};