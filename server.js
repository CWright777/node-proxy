var http = require('http');
var request = require("request");
var fs = require('fs');
var url = require('url');
var htmlparser = require("htmlparser2");

var server = http.createServer(function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var destination = "http://" + url_parts.pathname.slice(1) + "/" + query.host
  request(destination, function(error, response, body) {
    var cheerio = require('cheerio'),
          $ = cheerio.load(body)
          var yo = $('body *').contents().filter(function() {
            var $this = $(this);
            return( this.nodeType === 3 && this.parent.type !== 'script' && !this.data.includes("\n"));
           })
           yo.each(function(){
             words = this.data.split(" ")
                var temp = [];
             for(var word of words){
               var first_letter = word[0];
               temp.push(word.slice(1,word.length - 1) + first_letter + "ay")
              console.log(temp)
             }
             this.data = temp.join(" ")
           })
    var contents = ""
    //console.log(respone)
    //handler = new htmlparser.DomHandler(function(err, dom) {
      //select(dom).forEach(function(element) {
        //console.log(element)
      //})
    //})
    //var parser = new htmlparser.Parser({
      //onopentag: function(name, attribs){
        //var chainedAttrs = ""
        //for(key in attribs){
          //chainedAttrs += " " + key + "=" + attribs[key]
        //}
        //contents += "<" + name + chainedAttrs + ">"
      //},
      //ontext: function(text){
        //contents += text
      //},
      //onclosetag: function(tagname){
        //contents += "</" + tagname + ">";
      //}
    //}, {decodeEntities: true})
    //parser.parseComplete(body);
    //parser.write(body)
    //res.writeHead(200, {'Content-type': 'text/html'});
    //res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Request-Method', '*');
    //res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    //res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    //res.setHeader("Access-Control-Allow-Origin", "*");
    //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //res.writeHead(200);
    
    res.write($.html())
    res.end();
  });
})
server.listen(8080);
console.log("Running in localhost at port 8080");
