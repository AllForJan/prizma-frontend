import React,{Component} from 'react'
import {withRouter} from 'react-router'

class _Chart extends Component {
    componentDidMount(){

    }

    render(){
        return <h1>Hello! {this.props.match.params.id}</h1>
    }
}
export const Chart = withRouter(_Chart)