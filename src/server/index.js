var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}
var AYLIENTextAPI = require('aylien_textapi');
const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

//console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
//    res.sendFile('dist/index.html')
	res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
// set aylien API credentias
var textapi = new AYLIENTextAPI({
    application_id: "fe262dc9",
    application_key: "0ce9cb547908be43820e5e3b13d3eed0"
  });

app.post('/user',(request,response)=>{
   
    console.log(request.body.theText);
    textapi.sentiment({
        'text':request.body.theText
      }, function(error, data) {
        if (error === null) {
            
          response.send(data);
        }
      });
  });


