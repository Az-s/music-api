const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {

    console.log('router is working ');

    try {
        const token = await req.get("Authorization");
        const history = new TrackHistory(req.body);
        console.log(req.body);
        history.trackId = req.body.trackId;
        history.datetime = new Date().toLocaleString();

        console.log('Authorization ', token);
        const user = await User.findOne({token: token});
        history.userId = user._id;
        console.log('this is user id ', user._id);
        if (!user) {
            return res.status(401).send({error: 'Unauthorized'});
        }
        await history.save();
        res.status(200).send(history);
i
    } catch (error) {
        return res.status(400).send(error)
    }

});

module.exports = router;