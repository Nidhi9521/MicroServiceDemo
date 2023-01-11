import mongoose from 'mongoose';
import { ProductDoc, ProductModel, ProductSchema } from '../model/product';


let centralMongoCon: mongoose.Connection;

let ProductCentral: ProductModel;

export function mongoCentralCon(uri: string) {
    console.log("uri: ", uri);
    
    centralMongoCon = mongoose.createConnection(uri);
    ProductCentral = centralMongoCon.model<ProductDoc, ProductModel>('product', ProductSchema);
}

export { centralMongoCon, ProductCentral };