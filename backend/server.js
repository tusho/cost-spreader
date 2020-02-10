import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Item from './models/item';

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
  res.json({ message: 'Welcome to Cost Spreader!!' });
});

router.get('/items', (req, res) => {
  Item.find((err, items) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: items });
  });
});

router.post('/items', (req, res) => {
  const item = new Item();
  // body parser lets us use the req.body
  const { product, detail } = req.body;
  if (!product || !detail) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'No product or detail provided!'
    });
  }
  item.product = product;
  item.detail = detail;
  item.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put('/items/:itemId', (req, res) => {
  const { itemId } = req.params;
  if (!itemId) {
    return res.json({ success: false, error: 'No product id provided' });
  }
  Item.findById(itemId, (error, item) => {
    if (error) return res.json({ success: false, error });
    const { product, detail } = req.body;
    if (product) item.product = product;
    if (detail) item.detail = detail;
    item.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete('/items/:itemId', (req, res) => {
  const { itemId } = req.params;
  if (!itemId) {
    return res.json({ success: false, error: 'No product id provided' });
  }
  Item.remove({ _id: itemId }, (error, product) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));