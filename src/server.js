const express = require('express');
const path = require('path');
const request = require('request');
const querystring = require('querystring');

const port = process.env.PORT || 8080;
let app = express();

const redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8080/callback'

app.get('/users', (req, res) => {
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
});

app.get('/callback', (req, res) => {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from( 
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }

  request.post(authOptions, (error, response, body) => {
    let access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/search';
    res.redirect(uri + '?access_token=' + access_token);
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});