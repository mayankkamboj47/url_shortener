var express = require('express')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/urlshortener')
var Url = require('./urls.js')
var WEBURL = "http://localhost:3000";

function add(stuff,res){
Url.findOne({url:stuff},function(err,doc){
if(err)  res.send(err);
if(!doc){
Url.findOne().sort('-id').exec(function(err,item){
if(err) res.send(err);
var id = item.id+1;   // One greater than the largest index
var urlobj = {url:stuff,id:id};
var newUrl = new  Url(urlobj);
console.log("new url is",newUrl);
newUrl.save(function(err){
if(err) return console.log(err);
console.log("Saved successfully");
console.log(urlobj);
urlobj.short_url = WEBURL + "/"+ urlobj.id;
delete urlobj.id;
res.json(urlobj);
});
});
}
else{
res.json({url:doc.url,short_url:WEBURL+"/"+doc.id});
}
});
}

var app = express()

app.get('/',function(req,res){
var text = "URL Shortener microservice";
text+="\n(Use "+WEBURL+"/add to add a website)";
res.send(text);
});
app.get('/add/:url',function(req,res){
  add(req.params.url,res);
});
app.get('/:id',function(req,res){
var id = req.params.id;
Url.findOne({id:id},function(err,doc){
if(err) return console.log(err);
console.log('docs found',doc);
res.redirect(doc.url);
});
});
app.listen(3000);
