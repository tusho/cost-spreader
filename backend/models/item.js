import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  product: String,
  detail: String,
}, { timestamps: true });

// export our module to use in server.js
export default mongoose.model('Item', ItemsSchema);