import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();

      await Product.insertMany(products);

      console.log('Data Imported!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  })
  .catch((err) => console.error(err));
