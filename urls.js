var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect(process.env.SECRET,{useMongoClient:true});
var urlSchema = new Schema({
url:{type:String,required:true},
id:{type:Number,required:true,unique:true}
});
var Url = mongoose.model('Url',urlSchema);
module.exports = Url;
