// basic server from: http://blog.modulus.io/build-your-first-http-server-in-nodejs
// on: 20161129 15:20 EST

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
	// get body stuff from: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
	// on: 20161129 15:37 EST
	var body = [];
	request.on('data', function(chunk) {
	  body.push(chunk);
	}).on('end', function() {
	  body = Buffer.concat(body).toString();
	  console.log (body);
	});
	response_text = getDate() + " - " + convertToText(request.headers) + " || " + body;
    response.end(response_text);
    console.log (response_text);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

// from: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
// on: 20161129 15:33 EST
function getDate () {
	Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

var date = new Date();
return date.yyyymmdd();
}

// from: http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
// on: on: 20161129 15:24 EST
function convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (typeof(obj) == "object" && (obj.join == undefined)) {
        string.push("{");
        for (prop in obj) {
            string.push(prop, ": ", convertToText(obj[prop]), ",");
        };
        string.push("}");

    //is array
    } else if (typeof(obj) == "object" && !(obj.join == undefined)) {
        string.push("[")
        for(prop in obj) {
            string.push(convertToText(obj[prop]), ",");
        }
        string.push("]")

    //is function
    } else if (typeof(obj) == "function") {
        string.push(obj.toString())

    //all other values can be done with JSON.stringify
    } else {
        string.push(JSON.stringify(obj))
    }

    return string.join("")
}