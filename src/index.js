import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {composeWithDevTools} from 'redux-devtools-extension';
import {appReducer} from './entries/app-reducer'
import {Provider} from 'react-redux'
import {createStore} from 'redux'


const store = createStore(appReducer, {}, composeWithDevTools())

ReactDOM.render(
    <Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
