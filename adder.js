var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/urlshortener');
var Url = require('./urls.js');
function save(stuff){
Url.findOne({url:stuff},function(err,doc){
if(err) return err;
if(!doc){
Url.findOne().sort('-id').exec(function(err,item){
if(err) return err;
var id = item.id+1;   // One greater than the largest index
var urlobj = {url:stuff,id:id};
var newUrl = new  Url(urlobj);
console.log("new url is",newUrl);
newUrl.save(function(err){
if(err) return console.log(err);
console.log("Saved successfully");
console.log(urlobj);
return urlobj;
});
});
}
else{
return {url:doc.url,id:doc.id};
}
});
}
module.exports = save;
