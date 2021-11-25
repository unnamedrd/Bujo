const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../models/User")
var dotenv = require('dotenv');
dotenv.config();


//@route GET api/users
//desc Get all users
//@access Public
router.get("/", (req, res) => {
    User.find((err, users) => {
        if(err){
            res.send(err)
        } else {
            res.send(users)
        }
    })
});

//route POST api/users
//desc Create a user (REGISTER) and send back a token 
//@access Public
router.post("/", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 8 or more characters").isLength({min: 8}),
        check("username","Username is Required")
        .not()
        .isEmpty()
        .custom((value, {req}) => {
            return User.findOne({username: value}).then(user => {
                if(user){
                    return Promise.reject("Username already exists")
                }
            })}),
], async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password, username} = req.body

    try {
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({errors: [{msg: "User already exists"}]})
        }

        user = new User({
            name,
            email,
            password,
            username
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        const jwtSecret = process.env.JWT_SECRET;

        jwt.sign(payload, jwtSecret, {expiresIn: 360000}, (err, token) => {
            if(err) throw err
            res.json({token})
        })
        } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
})
//@route GET api/users/:id
//desc Get a user by id 
//@access Public
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            res.send(err)
        } else {
            res.send(user)
        }
    })
});

//@route DELETE api/users/:id
//desc Delete a user by id 
//@access Public
router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if(err){
            res.send(err)
        } else {
            res.json("User Deleted Successfuly.")
        }
    })
});

module.exports = router;
