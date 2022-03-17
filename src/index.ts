import express from 'express';
import { initialize } from './allSongData';
import { getSongData } from './getSongData';
import { QueryOpts } from './types';

const app = express();

app.get('/tswizzle', (req, res, next) => {
    return new Promise((resolve) => {
        // TODO: validate query
        const data = getSongData(req.query as QueryOpts);
        resolve(data);
    })
        .then((data) => res.send(data))
        .catch((err) => next(err));
});

console.log('SwiftCloud is warming up its vocal chords, please wait...');
initialize().then(() => {
    app.listen(8000, () =>
        console.log('SwiftCloud is ready to perform on port 8000!')
    );
}); // TODO: handle failure
