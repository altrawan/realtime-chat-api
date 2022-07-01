const { google } = require('googleapis');
const fs = require('fs');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI,
  DRIVE_REFRESH_TOKEN,
} = require('../helpers/env');

// oauth2 config
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: DRIVE_REFRESH_TOKEN });

const uploadGoogleDrive = async (file) => {
  try {
    const drive = google.drive({
      version: 'v3',
      auth: oAuth2Client,
    });

    // upload to google drive
    const response = await drive.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimetype,
        // parents: ['1m0Y6SIIiLvKKDRJqBamC1vXILIhWKzCs'],
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path),
      },
    });

    // set permission
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // get goggle drive link
    const result = await drive.files.get({
      fileId: response.data.id,
      fields: 'webViewLink, webContentLink',
    });

    return {
      id: response.data.id,
      gdLink: result.data.webViewLink,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadGoogleDrive;
