const express = require('express');
const cros = require("cors");
const fs = require("fs");
const path = require("path");
var ffmpeg = require('fluent-ffmpeg');
const thumbsupply = require('thumbsupply');
ffmpeg.setFfmpegPath("");
ffmpeg.setFfprobePath("");
const app = express();
const port = 3000;

const videos = [{
        id: 0,
        poster: 'video/0/poster',
        duration: '3 mins',
        name: 'Sample 1'
    },
    {
        id: 1,
        poster: 'video/1/poster',
        duration: '4 mins',
        name: 'Sample 2'
    },
    {
        id: 2,
        poster: 'video/2/poster',
        duration: '2 mins',
        name: 'Sample 3'
    }, {
        id: 3,
        poster: 'video/3/poster',
        duration: '120 mins',
        name: "How To Train your Dragon"
    }
];

app.use(cros());
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/video', (req, res) => {
    res.sendFile('assets/0.mp4', {
        root: __dirname
    });
})
app.get('/videos', (req, res) => res.json(videos));
app.get('/video/:id/poster', (req, res) => {
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
        .then(thumb => res.sendFile(thumb));
});
app.get('/video/:id/data', function (req, res) {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id]);
});

app.get("/video/:id", (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        console.info('we have range', range);
        const parts = range.replace(/bytes=/, " ").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        console.info("parts ", parts);;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {
            start,
            end
        });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        console.info("no range", range);
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.get('/video/:id/caption', function (req, res) {
    res.sendFile(`assets/captions/${req.params.id}.vtt`, {
        root: __dirname
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))