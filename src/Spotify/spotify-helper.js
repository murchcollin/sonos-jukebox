import secrets from './../secret';
const request = require('request');
const querystring = require('querystring');

const findTracks = async (query) => {
    const encodedQuery = {
        url: 'https://api.spotify.com/v1/search?'+
        querystring.stringify({
            q: query,
            type: 'track',
            limit: 15
        }),
        headers: {
            'Authorization': 'Bearer ' + secrets.getToken()
        },
        json: true
    }

    return new Promise((resolve, reject) => {
        request.get(encodedQuery, (error, response, body) => {
            if (response['statusCode'] !== 200) {
                reject('Invalid/No results');
                return;
            }

            let data = body['tracks']['items'] ? body['tracks']['items'] : [];
            let contents = [];

            for (let i=0; i<data.length; i++) {
                // Because sometimes there are multiple artists
                let artists = '';
                for (let j=0; j < data[i]['artists'].length; j++) {
                    artists += data[i]['artists'][j]['name'] + ', ';
                }
                artists = artists.substring(0, artists.length-2); // Remove excess , and space
                
                contents.push({
                    song:   data[i]['name'],
                    artist: artists,
                    album:  data[i]['album']['name'],
                    image:  data[i]['album']['images'][1]['url'],
                    uri:    data[i]['uri']
                });
            }

            resolve(contents);
        });
    });
};

export default findTracks;
