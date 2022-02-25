const express = require('express')
const friendsController = require('../controllers/friends.controller')

const router = express.Router()

router.get('/friends', friendsController.getFriends)

router.post('/friends', friendsController.postFriend)

router.get('/friends/:id', friendsController.getFriendById)

module.exports = router
