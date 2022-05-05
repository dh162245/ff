const asyncHandler = require('express-async-handler')
const Item = require('../models/itemModel')


// @desc Get items
// @route GET api/items
// @access Private
const getItem = asyncHandler(async (req, res) => {
    const items = await Item.find()

    res.status(200).json({ items })
})

// @desc Edit items
// @route POST api/items
// @access Private
const createItem = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text')
    }

   const item = await Item.create({
       text: req.body.text
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

    const editedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({ editedItem })
})

// @desc Get items
// @route GET api/items
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }

    await item.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getItem, 
    createItem, 
    editItem, 
    deleteItem
}