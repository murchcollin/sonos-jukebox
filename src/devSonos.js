const express = require('express');

let app = express();
let port = process.env.PORT || 5005;

app.get('/kitchen/state', (req, res) => {
    console.log(req);

    // Allow CORS
    res.set('Content-type', 'text/plain');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    if (req.headers['access-control-request-headers']) {
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    }

    res.send('{"currentTrack":{"absoluteAlbumArtUri": "https://proxy.duckduckgo.com/iur/?f=1&image_host=http%3A%2F%2Fwww.clubdancemixes.com%2Fwp-content%2Fuploads%2F2017%2F03%2FElla-Vos-White-Noise-R3hab-Remix.jpg&u=https://clubdancemixes.com/wp-content/uploads/2017/03/Ella-Vos-White-Noise-R3hab-Remix.jpg"}}');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});