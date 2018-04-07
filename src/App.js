import React, {Component} from 'react';
import {connect} from 'react-redux'
import {} from 'react-router'
import {SearchInput} from './search-component/search-input'
import './App.css'


class App extends Component {
    render() {
        const {loading} = this.props
        return (
            <div className={`wrapper ${loading && 'loading'}`}>
                <SearchInput/>
            </div>
        );
    }
}


export default connect((state) => {
    return ({
        loading: !!state.loading,
    })
})(App);
