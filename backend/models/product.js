import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  user: String,
  product: String,
  detail: String,
}, { boughtOn: Date });

// export our module to use in server.js
export default mongoose.model('Product', ProductsSchema);