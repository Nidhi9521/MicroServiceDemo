import mongoose from 'mongoose';
import { app } from './app';
import { mongoCentralCon } from './connection/central-connection';
import { mongoProductCon } from './connection/product-connection';
// import { ProductCreatedListener } from './event/listener/product-created-listener';
// import { ProductUpdateListener } from './event/listener/product-updated-listener';
import { natsWrapper } from './nats-wrapper';


const port = 3000;

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI_PRODUCT) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.MONGO_URI_CENTRALDB) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }

  if (!process.env.NATS_URI) {
    throw new Error('NATS_URII must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );

    natsWrapper.client.on('close', () => {
      process.exit();
    });



    process.on('SIGINT', () => natsWrapper.client!.close());
    process.on('SIGTERM', () => natsWrapper.client!.close());

    mongoose.set('strictQuery', false)

    // new ProductUpdateListener(natsWrapper.client).listen();
    // new ProductCreatedListener(natsWrapper.client).listen();

    mongoProductCon(process.env.MONGO_URI_PRODUCT);
    mongoCentralCon(process.env.MONGO_URI_CENTRALDB);

  } catch (error: any) {
    throw Error(error);
  }

  app.listen(port, () => {
    console.log('listen at', port);

  });
};

start();
