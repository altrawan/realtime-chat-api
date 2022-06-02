const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const {
  HOST_STMP,
  PORT_STMP,
  EMAIL_AUTH_STMP,
  PASS_AUTH_STMP,
  EMAIL_FROM,
} = require('../helpers/env');

let transporter = nodemailer.createTransport({
  host: HOST_STMP,
  port: PORT_STMP,
  secure: false,
  auth: {
    user: EMAIL_AUTH_STMP,
    pass: PASS_AUTH_STMP,
  },
});

module.exports = {
  sendEmail: (data) => {
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.html',
          partialsDir: path.resolve('./src/templates/confirm-email'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./src/templates/confirm-email'),
        extName: '.html',
      })
    );

    const emailOptions = {
      from: '"Preworld" <admin@preworld.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      template: data.template,
      context: data.context,
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  },
  sendReset: (data) => {
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.html',
          partialsDir: path.resolve('./src/templates/reset-password'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./src/templates/reset-password'),
        extName: '.html',
      })
    );

    const emailOptions = {
      from: '"Preworld" <admin@preworld.com>',
      to: data.to,
      subject: data.subject,
      text: data.text,
      template: data.template,
      context: data.context,
    };

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  },
};
