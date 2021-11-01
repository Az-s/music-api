const express = require('express');
const nanoid = require('nanoid');
const Track = require('../models/Track');
const router = express.Router();


router.get('/', (req, res) => {

    if (req.query.artist) {
        Track.find().populate('album').then(tracks => {
            const result = [];
            tracks.map(item => {
                if (item.album.artist == req.query.artist) {
                    result.push(item);
                }
            });
            if (tracks) res.send(result);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    } else if (req.query.album) {
        Track.find().populate('album').then(tracks => {
            const result = [];
            tracks.map(item => {
                if (item.album._id == req.query.album) {
                    result.push(item);
                }
            });

            if (tracks) res.send(result);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    } else {
        Track.find().populate('album')
            .then(tracks => res.send(tracks))
            .catch(() => res.sendStatus(500));
    }
});

module.exports = router;