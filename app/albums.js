const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Album = require('../models/Album');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {

    try {
        if (req.query.artist) {

            const albums = await Album.find().populate('artist');
            const result = [];
            albums.map(item => {
                if (item.artist._id == req.query.artist) {
                    result.push(item);
                }
            });

            if (albums) res.send(result);
            else res.sendStatus(404);

        } else {
            Album.find().populate('artist')
                .then(artists => res.send(artists))
                .catch(() => res.sendStatus(500));
        }

    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {

    try {
        const album = await Album.findOne({ _id: req.params.id }).populate('artist');

        if (album) {
            res.send(album);
        }
        else {
            res.sendStatus(404);
        }

    }
    catch {
        res.sendStatus(500);
    }
});


router.post('/', upload.single('image'), async (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }
    const album = new Album(albumData);

    try {
        await album.save();
        res.send(result);
    }
    catch {
        res.status(400).send(error);
    }

});

module.exports = router;