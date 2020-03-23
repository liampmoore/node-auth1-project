const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");


const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const restricted = require("../auth/restricted-middleware.js");

const server = express();


const sessionConfig = {
    name: "session",
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 120,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
}

server.use(helmet())
server.use(express.json())
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);

module.exports = server;