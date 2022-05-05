const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc register new user
// @route POST /api/users   
// @access Public

const registerUser = asyncHandler(async(req, res) => {
    const {
        name, email, password
    } = req.body

    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('please fill out all')
    }

    // Check if user exists

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User alrdy exists')
    }

    // hash pw

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create User

    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
        
    } else {
        res.status(400)
        throw new Error('Invalid user Data')
    }
})

// @desc Login
// @route POST /api/login   
// @access Public

const loginUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body
    
    
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid email or password')
    }
})


// @desc Get User data
// @route GET /api/users/me   
// @access Private

const getUser = asyncHandler(async(req, res) => {
    res.json({
        message: 'User displayed'
    })
})


// generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'})
}

module. exports = {
    registerUser,
    loginUser,
    getUser
}