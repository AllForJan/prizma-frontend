import React, {Component} from 'react'
import {withRouter} from 'react-router'
import ReactEcharts from 'echarts-for-react';

class _Chart extends Component {
    componentDidMount() {

    }

    getOption() {
        return {
            title: {
                text: 'ECharts entry example'
            },
            tooltip: {},
            legend: {
                data: ['Sales']
            },
            xAxis: {},
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
            }]
        }
    }

    render() {
        return <React.Fragment>
            <h1>Hello! {this.props.match.params.id}</h1>
            <ReactEcharts option={this.getOption()}/>
        </React.Fragment>
    }
}

export const Chart = withRouter(_Chart)