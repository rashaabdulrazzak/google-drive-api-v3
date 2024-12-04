const express = require('express');
const app = express();
const PORT = 3030;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

 let drive = require('./util/google-drive-api')
 
  
app.post('/uploadAFile', async(req, res) => {
    console.log(req.body) 
    let filenmae = req.body.filename
    console.log(filenmae)
  // const result =  await drive.uploadFile(filenmae)
    
          const result =   drive.uploadFile(filenmae).then(res =>console.log(res)).catch(err => console.log(err))
          console.log(result)

         

     
  // console.log(result)
  //  if(err){
  //      res.send(400)
  //  }
   res.sendStatus(200).end('result')   // var fileMetadata = {
    //   name: 'test1', // file name that will be saved in google drive
    // };
  
    // var media = {
    //   mimeType: 'audio/mp4',
    //   body: fs.createReadStream('./demo-file/test.mp4'), // Reading the file from our server
    // };
  
    // // Authenticating drive API
    // const drive = google.drive({ version: 'v3', auth });
  
    // // Uploading Single image to drive
    // drive.files.create(
    //   {
    //     resource: fileMetadata,
    //     media: media,
    //   },
    //   async (err, file) => {
    //     if (err) {
    //       // Handle error
    //       console.error(err);
  
    //       return res
    //         .status(400)
    //         .json({ errors: [{ msg: 'Server Error try again later' }] });
    //     } else {
    //       // if file upload success then return the unique google drive id
    //       res.status(200).json({
    //           //files : file.data
    //           //url 
    //           //https://drive.google.com/file/d/10iOFx7LHPl2zo6sujg1_PQig2S3tfTFp/view?usp=sharing
    //         fileID: file.data.id,
    //       });
    //     }
    //   }
    // );
  });

app.get('/testRoute', (req, res) => res.end('Hello from Server!'));

app.listen(PORT, () => {
  console.log(`Node.js App running on port ${PORT}...`);
});