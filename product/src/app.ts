import express from 'express';
import 'express-async-errors';
import { productRouter } from './routes/product-routes';


const app = express();

// The reason for this that traffic is being prixy to our app through ingress nginx
app.set('trust proxy', true);
app.use(express.json());
app.use(productRouter);


// Router


export { app };