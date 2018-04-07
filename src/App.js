import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {SearchInput} from './search-component/search-input'
import './App.css';

class App extends Component {


    render() {
        return (
            <div className="App">
                <SearchInput/>
            </div>
        );
    }
}

export default App;
