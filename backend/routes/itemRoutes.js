const express = require('express')
const router = express.Router()
const { getItem, 
        createItem, 
        editItem, 
        deleteItem } = require('../controllers/itemController')


const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getItem)
router.post('/', protect, createItem)

router.put('/:id', protect, editItem)
router.delete('/:id', protect, deleteItem)

module.exports = router