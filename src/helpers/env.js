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
  // email
  HOST_STMP: process.env.HOST_STMP,
  PORT_STMP: process.env.PORT_STMP,
  EMAIL_AUTH_STMP: process.env.EMAIL_AUTH_STMP,
  PASS_AUTH_STMP: process.env.PASS_AUTH_STMP,
  EMAIL_FROM: process.env.EMAIL_FROM,
};
