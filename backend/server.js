import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Product from './models/product';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cost Spreader!' });
});

router.get('/products', (req, res) => {
  Product.find((err, products) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: products });
  });
});

router.post('/products', (req, res) => {
  const products = new Product();
  // body parser lets us use the req.body
  const { product, detail } = req.body;
  if (!product || !detail) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'No product or detail provided!'
    });
  }
  products.product = product;
  products.detail = detail;
  products.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));