const path = require('path')
const friends = require('../models/friends.model')

const getFriends = (req, res) => {
    res.json(friends)
}

const postFriend = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Faid to create a new friend',
        })
    }

    const newFriend = {
        id: friends.length + 1,
        name: req.body.name,
    }

    friends.push(newFriend)
    return res.json(newFriend)
}

const getFriendById = (req, res) => {
    const id = req.params.id
    const friend = friends[id]
    if (friend) {
        return res.json(friend)
    } else {
        return res.status(404).json({
            error: 'Friend not found',
        })
    }
}

const getImage = (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'yamato.jpg')
    return res.sendFile(filePath)
}

module.exports = {
    getFriends,
    postFriend,
    getFriendById,
    getImage,
}
