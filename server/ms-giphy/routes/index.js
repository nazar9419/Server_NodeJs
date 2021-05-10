const { response } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const download = require('download');
const request = require('request');
const https = require('https');

//Fs module
/*fs.mkdir(path.join(__dirname, '/test'), {}, err=>{
  if(err) throw err;
  console.log('Folder created');
});*/

/* GET home page. */
router.get('/', function(req, res, next) {

  
  const url = "https://api.giphy.com/v1/gifs/search?&api_key=dc6zaTOxFJmzC&q=funny+cat";
  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);
    const imgUrl = getImage(body);
    //const result = body.data[3].images.original.url;
    //console.log(body);

    
    

    res.render('index', { title: 'Express', imgUrl: imgUrl });
  });
});

function getImage(body)
{
  for (var i =0; i<body.data.length; i++)
  {
     if(i<=10)
     {
      var imgUrl = body.data[i].images.original.url;  
      console.log(i + ' ......   '  + imgUrl + ' ..End of' + i + ' element');
      //const download = (imgUrl, path, cb)=>{
      const file = fs.createWriteStream("gifimg.jpg");
      const request = router.get(imgUrl, function(response){
        response.pipe(file);
      });
      https.get(imgUrl, function(res){
        const filestream = fs.createWriteStream("photo.gif");
        res.pipe(filestream);
        filestream.on("finish", function(){
          filestream.close();
          

        });
      });    
      
     } 
      
      
  }
     
     return body

     
}
  



module.exports = router;