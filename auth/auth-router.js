const bcrypt = require("bcryptjs");

const router = require('express').Router()

const Users = require("../users/users-model");


router.post("/register", (req, res) => {
    const credentials = req.body;

    const ROUNDS = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, ROUNDS)

    credentials.password = hash;

    Users.add(credentials)
        .then(user => {
            req.session.user = {
                id: user.id
            }
            res.status(201).json({message: "Successfully created user"});
        })
        .catch(err => res.status(500).json({error: "Problem while creating the user."}));
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                };
                res.status(200).json({ message: "Logged in." });
            } else {
                res.status(401).json({ message: "Invalid credentials." });
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "Error during login process." });
        });
})