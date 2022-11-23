const asyncHandler = require('express-async-handler')
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
    res.send('Register Route');
})

// @desc   login a user
// @path   /api/users/login
// @access Public
const loginUser = asyncHandler(async(req,res) => {
    res.send('Login Route');
})

module.exports = {
    registerUser,
    loginUser
};