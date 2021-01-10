const path = require('path');
const fs = require('fs');

var noOfChunks = 10;
var combinedData = []

function readFiles(i=1,combinedData){
    let fileName = 'companyDataChunk'+i+'.json';
    let filePath = path.join('..','ScrapedData',fileName);
    fs.readFile(filePath, function(err, data){
          if(err) throw err;
          let jsonData = JSON.parse(data);
          console.log(jsonData[0]);
          let newCombinedData = combinedData.concat(jsonData);
          if(i === noOfChunks){
              fs.writeFile('combinedData.json', JSON.stringify(newCombinedData), function(err){
                  if(err) throw err;
                  console.log('It\'s Saved');
              });
          }
          else{
              readFiles(i+1,newCombinedData)
          }
     });
}

readFiles(1,combinedData);
