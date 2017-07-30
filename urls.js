var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/urlshortener');
var urlSchema = new Schema({
url:{type:String,required:true},
id:{type:Number,required:true,unique:true}
});
var Url = mongoose.model('Url',urlSchema);
module.exports = Url;
