import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
 
import './index.css';
import Nav from './Components/Nav/Nav'

import registerServiceWorker from './registerServiceWorker';

const Navigation = () => {
    return(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );
}

ReactDOM.render(<Navigation />, document.getElementById('root'));
registerServiceWorker();