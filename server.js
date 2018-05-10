require("dotenv").load();
//Dependencies
const express = require("express");

// Parsers && other tools
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//  Authentication
const session = require("express-session");
const flash = require("connect-flash");
var passport = require("passport");

// DataBase
const mongoose = require("mongoose");
const db = require("./models");

// IGDB API
const igdb = require("igdb-api-node").default;
const client = igdb(process.env.MY_API_KEY);

const exphbs = require("express-handlebars");

const fileUpload = require("express-fileupload");

require("./config/passport")(passport);

const PORT = process.env.PORT || 3000;

const app = express();
// Required for passport (Oauth)
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(fileUpload());

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import Routes and go ahead and pass them their needed dependencies.
const authRoutes = require("./controllers/authController")(
  express,
  app,
  passport,
  db
);
const apiRoutes = require("./controllers/apiController")(
  express,
  app,
  igdb,
  client
);
const reviewRoutes = require("./controllers/reviewController")(
  express,
  app,
  db
);
const userRoutes = require("./controllers/userController")(
  express,
  app,
  db,
  passport
);
const uploadRoutes = require("./controllers/uploadController")(
  express,
  app,
  fileUpload
);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/VGDB";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
