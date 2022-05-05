const asyncHandler = require('express-async-handler')


// @desc Get items
// @route GET api/items
// @access Private
const getItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get items'})
})

// @desc Edit items
// @route POST api/items
// @access Private
const createItem = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('add a text')
    }
   res.status(200).json({ message: 'Create items'})
})

// @desc Edit items
// @route PUT api/items/:id
// @access Private
const editItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Edit item ${req.params.id}`})
})

// @desc Get items
// @route GET api/items
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete item ${req.params.id}`})
})

module.exports = {
    getItem, 
    createItem, 
    editItem, 
    deleteItem
}