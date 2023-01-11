
import { ProductCentral } from '../connection/central-connection';
import { Product } from '../connection/product-connection';

import { natsWrapper } from '../nats-wrapper';

export class productDatabaseLayer {

    static async createproduct(req: any) {
        const { name, basePrice, quantity } = req.body;
        const data = Product.build({
            name: name,
            basePrice: basePrice,
            quantity: quantity
        })
        await data.save();
        console.log('1');
        
        // await new ProductCreatedPublisher(natsWrapper.client).publish({
        //     id: data.id,
        //     name: data.name,
        //     basePrice: data.basePrice,
        //     quantity: data.quantity
        // })
        console.log('2');
        return data;
    }

    static async updateproduct(req: any, id: string) {

        const { name, basePrice, quantity } = req.body;
        const data = await Product.findById(id);

        if (data) {
            await Product.findByIdAndUpdate(id, {
                name: name,
                basePrice: basePrice,
                quantity: quantity
            });
            // await new ProductUpdatedPublisher(natsWrapper.client).publish({
            //     id: id,
            //     name: name,
            //     basePrice: basePrice,
            //     quantity: quantity
            // })
            return true;
        } else {
            return false;
        }

    }

    static async deleteproduct(req: any, id: string) {
        const data = await Product.findById(id);

        if (data) {
            await Product.findByIdAndRemove(id);
            return true;
        } else {
            return false;
        }
    }

    static async getproductById(req: any, id: string) {
        const data = await ProductCentral.findById(id);
        if (data) {
            return data;
        }
    }

    static async getproduct() {
        const data = await ProductCentral.find();
        return data;
    }

}