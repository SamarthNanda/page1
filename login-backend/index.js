const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;


const jwt = require("jsonwebtoken");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// database-----------------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/loginDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const loginSchema = new mongoose.Schema({
    userType: String,
    email: String,
    password: String
});

const User = mongoose.model("User", loginSchema);



// register route------------------------------------------------------------------------------
app.post("/register", async function (req, res) {
    console.log("in reg route");
    const userType = req.body.userType;
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
        console.log("user existed")
        res.json({ message: "error" });
    } else {
        bcrypt.hash(password, saltRounds, function (err, hash) {

            try {

                const newUser = new User({
                    userType: userType,
                    email: username,
                    password: hash
                })

                newUser.save(function (err) {
                    if (err) {
                        console.log("error  " + err);
                        res.json({ message: "error" })
                    } else {
                        console.log("user is saved in database");
                        res.json({ message: "saved" })
                    }
                });
            } catch (error) {
                console.log(error);
            }

        });
    }
});


// login route------------------------------------------------------------------------------
app.post("/login", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("in login post req");

    User.findOne({ email: username }, function (err, foundUser) {
        if (!foundUser) {
            console.log("User not found");
            res.json({ message: "User not found" });
        }
        if (foundUser) {
            bcrypt.compare(password, foundUser.password, function (err, result) {
                console.log(result);
                if (result) {
                    const token = jwt.sign({ email: foundUser.email, userType: foundUser.userType, id: foundUser._id }, "jwtSecret", {
                        expiresIn: 10
                    });
                    const refreshToken = jwt.sign({ email: foundUser.email, userType: foundUser.userType, id: foundUser._id }, "jwtRefreshSecret", {
                        expiresIn: 10
                    });

                    console.log(foundUser + "  " + token);

                    console.log("logged in");
                    res.json({ token });
                }
                else {
                    console.log("wrong password");
                    res.json({ message: "wrong password" });
                }
            });


        }

    });
});

app.listen(3001, function (req, res) {
    console.log("server is working");
})