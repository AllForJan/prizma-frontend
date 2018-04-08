import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react';

class _Chart extends Component {
    componentDidMount() {
    }

    getOption() {
        const {chartData} = this.props
        return {
            title: {
                text: chartData.legend
            },
            tooltip: {},
            legend: {
                data: ['bar']
            },
            xAxis: {
                name: 'bar',
                data: chartData.xLegend || []
            },
            yAxis: {},
            series: [{
                name: 'bar',
                type: 'bar',
                data: chartData.values || []
            }]
        }
    }

    render() {
        const {chartData} = this.props
        return chartData ? <ReactEcharts option={this.getOption()}/> : null
    }
}



export const Chart = _Chart