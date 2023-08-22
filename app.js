require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { connect } = require('mongoose');
const app = express();
const bodyParser = require('body-parser'); // Import body-parser
const PORT = process.env.PORT || 3000;

const routeIndex = require('./routers/index');
const routeLogin = require('./routers/login');
const routeLogout = require('./routers/logout');
const routeRegister = require('./routers/register');
const routeAdmin = require('./routers/admin');
const routeAdminHome = require('./routers/adminHome');
const routeServers = require('./routers/servers');
const routeAuth = require('./routers/auth');

//server start here
async () => {
  try {
    let connection = await connect(process.env.MONGODBCONNECTIONSTRING);
    console.log(`Connected to mongodb on ${connection.Connection.name}`);
  } catch (error) {
    console.error(error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text()); // configure the app to be able to read text
app.set('view engine', 'ejs');

//session
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);

//routes
app.use('/', routeIndex);
app.use('/login', routeLogin);
app.use('/logout', routeLogout);
app.use('/register', routeRegister);
app.use('/admin', routeAdmin);
app.use('/adminHome', routeAdminHome);
app.use('/servers', routeServers);
app.use('/auth', routeAuth);

app.listen(PORT, () =>
  console.log(`your site is running on http://localhost:${PORT}`)
);
