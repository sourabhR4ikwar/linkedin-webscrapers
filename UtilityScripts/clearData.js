const fs = require('fs');
let jsonData;

// fs.readFile('companyRef.json', function (err, data) {
//   if (err) throw err;
//   jsonData = JSON.parse(data);
//   updatedData = {...jsonData}
// //   console.log(updatedData.companyData[0]);
// //   updatedData.companyData[0].address = jsonData.companyData[0].address.replace('?trk=companies_directory','/about/');
// //   console.log(updatedData.companyData[0]);
//   for(let i =0; i<jsonData.companyData.length; i++){
//     updatedData.companyData[i].address = jsonData.companyData[i].address.replace('?trk=companies_directory','/about/');
//   }
//   fs.writeFile('companyRefUpdated.json', JSON.stringify(updatedData), err => {
//       if(err) throw err;
//       console.log('Saved Succesfully');
//   })
// });

fs.readFile('companyRefUpdated.json', function(err, data) {
    if(err) throw err;
    jsonData = JSON.parse(data);
    console.log(jsonData.companyData[0]);
})


