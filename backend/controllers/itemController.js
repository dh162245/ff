const asyncHandler = require('express-async-handler')
const Item = require('../models/itemModel')
const User = require('../models/userModel')


// @desc Get/Find items
// @route GET api/items
// @access Private
const getItem = asyncHandler(async (req, res) => {
    const items = await Item.find({ user: req.user.id })

    res.status(200).json({ items })
})

// @desc Create items
// @route POST api/items
// @access Private
const createItem = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text')
    }

   const item = await Item.create({
       text: req.body.text,
       user: req.user.id
   }) 
    
   res.status(200).json({ item })
})

// @desc Edit items
// @route PUT api/items/:id
// @access Private
const editItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }

    const user = await User.findById(req.user.id)

    // checking for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // checking if logged in user has rights to edit items
    if(item.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const editedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({ editedItem })
})

// @desc Delete items
// @route Delete api/items
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }

    const user = await User.findById(req.user.id)

    // checking for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // checking if logged in user has rights to delete items
    if(item.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await item.remove()

    res.status(200).json(
         { message: "Item deleted", id: req.params.id })
})

module.exports = {
    getItem, 
    createItem, 
    editItem, 
    deleteItem
}