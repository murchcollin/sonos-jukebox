import React from 'react';
import './Card.css'

const card = (props) => {
    return (
        <div className="Card"
        onClick={props.click}>
        
            <img src={props.image} 
            alt={props.children} />

            <p className="card_item">
                {props.children.song   + ' -- ' + 
                 props.children.artist + ' -- ' +
                 props.children.album}
            </p>
        </div>
    );
}

export default card;