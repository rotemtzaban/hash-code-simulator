import App from './App';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

var RouterApp = () => <BrowserRouter><App></App></BrowserRouter>

render(<RouterApp />, document.getElementById('root'));
