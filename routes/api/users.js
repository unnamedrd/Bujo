const express = require("express");
const router = express.Router();
const User = require("../../models/User")

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

module.exports = router;
