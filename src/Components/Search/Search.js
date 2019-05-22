import React, { Component } from 'react';
import Card from './Card';
import './Search.css'

import findTracks from './../../Spotify/spotify-helper';
import sonos from './../../Sonos/sonos-helper';
import secrets from './../../secret';

// This is temporary -- fix later
const tokenURI = 'http://localhost:8080/login'

class Search extends Component {

    state = {
        input: '',
        contents: [], // -- Becomes array of dictionaries (properties for each song)
        selected: []  // -- Becomes array of dictionaries (properties for each song)
    }

    // Check query params as soon as page loads
    componentDidMount() {
        const params = window.location.search.substring(1)
                        .split('&')
                        .filter((item) => { return item.length > 0 });

        if (params.length > 0) this.tokenHandler(params);
    }

    inputHandler = (e) => {
        let input = e.target.value;

        // Must set input state before everything else, otherwise lag
        this.setState({input});

        if (input !== '') {
            findTracks(input).then((response) => {
                this.setState({contents: response});
            }).catch((error) => {
                console.log(error);
                this.setState({contents: []});

                // Attempt to grab token (most likely the cause of error)
                this.redirectHandler();
            });
        } else {
            this.setState({contents: []});
        }
    }

    cardClick = (i) => {
        let selected = this.state.selected;

        if (selected.length < 3) {
            selected.push(this.state.contents[i]);

            this.setState({selected});
        }
    }

    removeCard = (i) => {
        let selected = this.state.selected;

        let bounds = i > 0 ? i : 1;

        selected.splice(i, bounds);
        
        this.setState({selected});
    }

    cardHandler = (item, i) => {
        return (
            <Card key={i} 
            click={this.cardClick.bind(this, i)}
            image={item.image}>
                {item}
            </Card>
        );
    }

    selectedCardHandler = (item, i) => {
        return (
            <Card key={"selected"+i} 
            image={item.image}
            click={this.removeCard.bind(this, i)}>
                {item}
            </Card>
        );
    }

    goHandler = () => {
        sonos.sendTracks(this.state.selected.map((item) => {return item}));
    }

    redirectHandler = () => {
        window.location.assign(tokenURI);
    }

    // Incredbily insecure. Fix needed.
    tokenHandler = (params) => {
        let token = params.find((e) => {
            return e.startsWith('access_token=')
        }).replace('access_token=', '');

        secrets.updateToken(token);

        console.log('Using new token: ' + secrets.getToken());
    }

    render() {
        return (
            <div className="search_component">
                <div className="selected_items">
                    {this.state.selected.map(this.selectedCardHandler)}
                </div>
                <div className="search_box"
                style={{textAlign: 'center'}}>
                    <input type="text" 
                    className="search"
                    onChange={this.inputHandler} 
                    value={this.state.input} />

                    <button type="button"
                    className="button"
                    onClick={this.goHandler}>
                    Go</button>

                    <button type="button"
                    className="button"
                    onClick={this.redirectHandler}>
                    Request Token</button>

                    <div className="card_results">
                        {this.state.contents.map(this.cardHandler)}
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Search;