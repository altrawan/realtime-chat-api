require('dotenv').config();

module.exports = {
  // app
  APP_NAME: process.env.APP_NAME || 'Telegram',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  API_URL: process.env.API_URL,
  APP_CLIENT: process.env.APP_CLIENT,
  // database
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  // jwt
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRED: process.env.JWT_EXPIRED,
  // google
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_USER: process.env.EMAIL_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
  DRIVE_REFRESH_TOKEN: process.env.DRIVE_REFRESH_TOKEN,
};
