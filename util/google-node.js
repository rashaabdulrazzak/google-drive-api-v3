
const {google} = require('googleapis');
//https://www.googleapis.com/auth/drive.appdata
const auth = new google.auth.GoogleAuth({
  keyFile: './key.json',
  scopes:  ["https://www.googleapis.com/auth/drive.file"] // ['https://www.googleapis.com/auth/cloud-platform'],
});

const drive = google.drive({
    version: 'v3',
    auth
  });
  const fs = require('fs');

  async function main() {
    const res = await drive.files.create({
      requestBody: {
        name: 'awesome.png',
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream('./demo-file/awesome.png')
      }
    });
    console.log({
      status: {
        code: res.status,
        text: res.statusText
      },
      ...res.data
    })
    console.log(`
    you can open the file at this link: https://drive.google.com/file/d/${res.data.id}/view
    `)
    const res2 = await drive.permissions.create({
      fileId: res.data.id,
      requestBody: {
        "role": "reader",
        "type": "anyone",
      },
    });
    console.log({
      status: {
        code: res2.status,
        text: res2.statusText
      },
      ...res2.data
    })
  }
   
 // main().catch(console.error);
  
  // async function main() {
  //   const res = await drive.files.create({
  //     requestBody: {
  //       name: 'testimage.png',
  //       mimeType: 'image/png'        
  //     },
  //     media: {
  //       mimeType: 'image/png',
  //       body: fs.createReadStream('./demo-file/awesome.png')
  //     }
  //   });
  //   console.log(res.data);
  //   let googleUrl = `https://drive.google.com/file/d/${res.data.id}/view`;
  //   console.log(googleUrl);
  // }
  
  main().catch(console.error);