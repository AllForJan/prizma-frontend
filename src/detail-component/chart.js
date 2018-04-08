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
                data: [chartData.legendName||'']
            },
            xAxis: {
                name: chartData.xLegendName || '',
                data: chartData.xLegend || []
            },
            yAxis: {},
            series: [{
                name: chartData.seriesName || '',
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