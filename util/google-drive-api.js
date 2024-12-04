// for dealing with google
// const fs = require("fs");
// const readline = require("readline");
// const { google } = require("googleapis");

// const SCOPES = ["https://www.googleapis.com/auth/drive"];
// const TOKEN_PATH = "token.json";
// let auth;

// // Load client secrets from a local file.
// fs.readFile("credentials.json", (err, content) => {
//   if (err) return console.log("Error loading client secret file:", err);
//   // Authorize a client with credentials, then call the Google Drive API.
//   authorize(JSON.parse(content));
// });
// // ...
// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials) {
//   const { client_secret, client_id, redirect_uris } = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     auth = oAuth2Client;
//   });
// }
// ...

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      auth = authoAuth2Client;
    });
  });
}

// function uploadFile(fileName){

//   var fileMetadata = {
//       name: fileName, // file name that will be saved in google drive
//     };

//     var media = {
//       mimeType: 'audio/mp4',
//       body: fs.createReadStream(`./demo-file/${fileName}.mp4`), // Reading the file from our server
//     };

//     // Authenticating drive API
//     const drive = google.drive({ version: 'v3', auth });

//     // Uploading Single image to drive
//     drive.files.create(
//       {
//         resource: fileMetadata,
//         media: media,
//       },
//       async (err, file) => {
//         if (err) {
//           // Handle error
//           console.error(err);

//           return err

//         } else {
//           // if file upload success then return the unique google drive id
//           // url type : //https://drive.google.com/file/d/10iOFx7LHPl2zo6sujg1_PQig2S3tfTFp/view?usp=sharing
//           let googleUrl =` https://drive.google.com/file/d/${file.data.id}/view`
//          // console.log(googleUrl)
//          return googleUrl
//         }
//       }
//     );
// }
function uploadFile(fileName) {
  return new Promise((resolve, reject) => {
    const fileMetadata = {
      name: fileName,
    };
    const media = {
      mimeType: "audio/mp4",
      body: fs.createReadStream(`./demo-file/${fileName}.mp4`),
    };
    // Authenticating drive API
    const drive = google.drive({ version: "v3", auth });

    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
      },
      (err, file) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          // url type : //https://drive.google.com/file/d/10iOFx7LHPl2zo6sujg1_PQig2S3tfTFp/view?usp=sharing
          let googleUrl = ` https://drive.google.com/file/d/${file.data.id}/view`;
          //  console.log(googleUrl)
          resolve(googleUrl);
        }
      }
    );
  });
}
module.exports = {
  uploadFile,
};
