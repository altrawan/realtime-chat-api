const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const socketio = require('socket.io');
const http = require('http');
require('dotenv').config();
const { APP_NAME, NODE_ENV, PORT } = require('./src/helpers/env');
const { failed } = require('./src/helpers/response');

const listenSocket = require('./src/socket');

const app = express();

// morgan
app.use(morgan('dev'));

// enable cors
app.use(cors());
app.options('*', cors());

// set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

// sanitize request data
app.use(xss());

// compression
app.use(compression());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ejs
app.set('views', `${__dirname}/src/views`);
app.set('view engine', 'ejs');

app.use(express.static('public'));

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');
  listenSocket(io, socket);
});

app.get('/', (req, res) =>
  res.send(`${APP_NAME} API - ${NODE_ENV[0].toUpperCase() + NODE_ENV.slice(1)}`)
);

// main route
app.use(require('./src/routes/auth.route'));
app.use(require('./src/routes/user.route'));

app.use((req, res) => {
  failed(res, {
    code: 404,
    message: 'Resource on that url not found',
    error: 'Not Found',
  });
});

// const APP_PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(
    `Server running running at port ${PORT} with ${NODE_ENV} environment`
  );
});
