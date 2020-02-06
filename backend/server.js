import { getSecret } from './secrets';
const API_PORT = process.env.API_PORT || 3001;

// db config -- set your URI from mLab in secrets.js
var mongoose = require('mongoose');
mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));