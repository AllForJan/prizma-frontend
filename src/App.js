import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import {SearchInput} from './search-component/search-input'
import {DetailComponent} from './detail-component/detail-component'
import './App.css'


class App extends Component {
    render() {
        const {loading} = this.props
        return (
            <BrowserRouter>
                <div className={`wrapper ${loading && 'loading'}`}>
                    <Switch>
                        <Route path={'/:id'}><DetailComponent/></Route>
                        <Route path={'/'}><SearchInput/></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


export default connect((state) => {
    return ({
        loading: !!state.loading,
    })
})(App);
