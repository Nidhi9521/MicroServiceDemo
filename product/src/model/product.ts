import mongoose, { ObjectId } from "mongoose";
import { Product } from "../connection/product-connection";


// intetface that describe the prooerties
// that are required to cretae new category
export interface ProductAttrs {
    name: string;
    basePrice: number;
    quantity: number;
}

// interface for categorymodel pass
export interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
}

// interface for single category properties
export interface ProductDoc extends mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    basePrice: number;
    quantity: number;
}

export const ProductSchema = new mongoose.Schema({
    name: { type: String },
    basePrice: { type: Number },
    quantity: { type: Number },
    createdAt: { type: Number, default: () => Date.now() },
    updatedAt: { type: Number, default: () => Date.now() },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.ProductId = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    }
});

ProductSchema.pre('save', async function (done) {
    done();
})
ProductSchema.pre('update', async function (done) {

})

ProductSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
}

// const Product = mongoose.model<ProductDoc, ProductModel>('Product', ProductSchema);

// export { Product };