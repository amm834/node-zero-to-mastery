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
    res.json(newFriend)
}

const getFriendById = (req, res) => {
    const id = req.params.id
    const friend = friends[id]
    if (friend) {
        res.json(friend)
    } else {
        res.status(404).json({
            error: 'Friend not found',
        })
    }
}

module.exports = {
    getFriends,
    postFriend,
    getFriendById,
}
