
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { productDatabaseLayer } from '../database/product-database';

export class productDomain {

    static async createproduct(req: Request, res: Response) {
        const product = await productDatabaseLayer.createproduct(req);
        res.status(201).send(product);
    }

    static async updateproduct(req: Request, res: Response) {
        const data = await productDatabaseLayer.updateproduct(req, req.params.id);
        if (data) {
            res.status(201).send({ updated: true });
        } else {
            res.status(400).send({ error: "Data Not Found" })
        }
    }

    static async deleteproduct(req: Request, res: Response) {
        const data = await productDatabaseLayer.deleteproduct(req, req.params.id);
        if (data) {
            res.status(201).send({ deleted: true });
        } else {
            res.status(400).send({ error: "Data Not Found" })
        }
    }

    static async getproductId(req: Request, res: Response) {
        const product = await productDatabaseLayer.getproductById(req, req.params.id);
        res.status(201).send(product);
    }

    static async getproduct(req: Request, res: Response) {
        const product = await productDatabaseLayer.getproduct();
        res.status(201).send(product);
    }


}