const express = require('express');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');
const config = require('../config');
const Artist = require('../models/Artist');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if (req.query.id) {
        const artists = Artist.findOne({shortUrl: req.params.shortUrl}).then(link => {
            if (link) res.status(301).redirect(link.originalUrl);
            else res.sendStatus(404);
        }).catch(() => res.sendStatus(500));
    } else {
        Artist.find()
        .then(artists => res.send(artists))
        .catch(() => res.sendStatus(500));
    }
});


router.post('/', upload.single('image'), (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);

    artist.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

module.exports = router;