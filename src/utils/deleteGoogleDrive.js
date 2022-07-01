require('dotenv').config();
const { google } = require('googleapis');
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

const deleteGoogleDrive = async (id) => {
  try {
    const drive = google.drive({
      version: 'v3',
      auth: oAuth2Client,
    });

    const response = await drive.files.delete({
      fileId: id,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteGoogleDrive;
