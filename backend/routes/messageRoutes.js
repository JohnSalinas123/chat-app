const express = require('express');
const router = express.Router();
const {getMessages} = require('../controllers/messagesController')

router.get('/', getMessages);

router.delete('/:id', (req,res) => {
    res.status(200).json({message: `Delete message ${req.params.id}`})
})


module.exports = router;