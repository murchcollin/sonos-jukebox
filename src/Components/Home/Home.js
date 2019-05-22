import React, { Component } from 'react';

import sonos from './../../Sonos/sonos-helper';
import './Home.css';

class Home extends Component {
    state = {
        track: '',
        imageURI: '',
        test: ''
    }

    componentDidMount() {
        fetch('/users')
            .then(res => console.log(res));

        sonos.getState().then((response) => {
            const state = JSON.parse(response);
            console.log(state);

            this.setState({imageURI: state['currentTrack']['absoluteAlbumArtUri'],
                           track:    state['currentTrack']['title']});
        }).catch((error) => {
            console.log(error)
        });
    }

    imageHandler = () => {

    }

    render () {
        return (
            <div className="home_component">
                <div className="current_song">
                    <p>{this.state.test}</p>
                    <p>{this.state.track}</p>
                    <img src={this.state.imageURI} 
                        alt={this.state.track}
                        className="artwork"/>
                </div>
            </div>
        );
    }
}

export default Home;