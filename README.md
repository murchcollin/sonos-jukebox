This project is under heavy work, but if you want to help contribute, then do the following:

1. git clone the repo
2. make a file called "secret.js" in the ./src directory, and add what I have at the bottom of this README to the file
3. open two terminal windows (or tmux sessions)
4. In the first window, export SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET as environment variables, which should coorespond to the same tokens as your spotify app (https://developer.spotify.com/dashboard/)
5. Make sure that http://localhost:8080/callback is added as a valid callback URI in your spotify app (done through above link)
6. node ./src/server.js in the first terminal window (the same one that the variables are exported in)
7. npm start in the second terminal window
8. start typing in the search box to initiate the token workflow

Honestly this project is going to go through major changes in the weeks to come, but if you want to contribute, then all the more power to ya.

P.S. -- this README is horrible, but is a placeholder. I'll fix it later.


**secret.js file stuffs:**

let token = '';

const updateToken = (newToken) => { token = newToken }

const getToken = () => { return token }

const ip = 'localhost:5005';

export default { getToken, updateToken, ip };
