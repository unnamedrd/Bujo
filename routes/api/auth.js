const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

// @route   GET api/auth
// @desc    Get logged in user info
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth 
// @desc    Authenticate user & get token (login)
// @access  Public 
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // See if user exists with email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Check if password matches 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // Return jsonwebtoken & user 
        const payload = {
            user: {
                id: user.id
            }
        };
        // Sign token with payload and secret key 
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
