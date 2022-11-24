const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

// @desc   register a new user
// @path   /api/users/
// @access Public
const registerUser = asyncHandler(async(req,res) => {
    const {name , email , password} = req.body;

    // validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please include all fields")
    }

    // if the user already exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // hashing the password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    // creating the new user
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    });

    if(user){
        res.status(201).json({
            name : user.name,
            email: user.email,
            _id : user._id,
            token : generateToken(user._id),
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }

})

// @desc   login a user
// @path   /api/users/login
// @access Public
const loginUser = asyncHandler(async(req,res) => {
    const { email , password } = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password , user.password))){
        res.status(200).json({
            name : user.name,
            email : user.email,
            _id : user._id,
            token : generateToken(user._id),
        })
    } else{
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc   get me 
// @path   /api/users/me
// @access Private
const getMe = asyncHandler(async(req,res) => {
    const user = {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email,
    }
    res.status(200).json(user);
});

// generateToken()

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, {
        expiresIn : '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};