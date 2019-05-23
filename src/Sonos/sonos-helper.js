import secrets from './../secret'
const request = require('request');

const uri = "http://" + secrets.ip;
const playEndpoint = "/kitchen/spotify/now/";
const getEndpoint = "/kitchen/state";

const sendTracks = (selected) => {
    request.get(uri + playEndpoint + selected[0].uri, (error, response, body) => {
        console.log(body);
    });

    for (let i=0; i<selected.length-1; i++) {
        request.get(uri + playEndpoint + selected[i+1].uri, (error, response, body) => {
            console.log(body);
        });
    }
};

const getState = async () => {
    return new Promise((resolve, reject) => {
        request.get(uri + getEndpoint, (error, response, body) => {
            resolve(body);
        });
    });
};

export default {sendTracks, getState};