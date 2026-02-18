const express = require('express');
const app = express();
const path = require('node:path');
const assetsPath = path.join(__dirname, 'public');
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./lib/passport");

const prisma = require('./lib/prisma');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');

const loginRouter = require('./routes/loginRouter');
const signupRouter = require('./routes/signupRouter');
const indexRouter = require('./routes/indexRouter');
const uploadRouter = require('./routes/uploadRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined
        }
    ),
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/home", indexRouter);
app.use("/", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/upload", uploadRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(`Express app listening on port ${PORT}!`));