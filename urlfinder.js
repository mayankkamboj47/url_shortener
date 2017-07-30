var Url = require('./urls.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortener');
function lookup(id,res){
Url.findOne({id:id},function(err,doc){
if(err) return console.log(err);
console.log('docs found',doc);
res.json(doc);
});
}
module.exports = lookup;
