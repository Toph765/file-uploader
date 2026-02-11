const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
const pool = require("./db/pool");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
require("dotenv").config();
require("./lib/passport");

const sessionStore = new pgSession({ pool });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(`Express app listening on port ${PORT}!`));