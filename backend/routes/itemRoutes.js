const express = require('express')
const router = express.Router()
const { getItem, 
        createItem, 
        editItem, 
        deleteItem } = require('../controllers/itemController')

router.get('/', getItem)
router.post('/', createItem)

router.put('/:id', editItem)
router.delete('/:id', deleteItem)

module.exports = router