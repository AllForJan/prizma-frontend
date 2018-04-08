import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Chart} from "./chart";
import {Map} from "./map";
import {createAction} from '../entries/actions'
import {config} from '../config'

const {api_root} = config

class _DetailComponent extends React.Component {
    async componentDidMount() {
        const {dispatch, match: {params: {id}}} = this.props
        const {data} = await axios.get(`${api_root}po/${id}`)
        dispatch(createAction('USER_DETAIL', data))
    }

    render() {
        const {subsidiesPerYear, requestsPerYear} = this.props
        return <div className="container">
            <div className="row">
                <div className="col-6">
                    <Chart chartData={subsidiesPerYear}/>
                </div>
                <div className="col-6">
                    <Chart chartData={requestsPerYear}/>
                </div>
            </div>
            <Map/>
        </div>
    }
}

const detailComponentSelector = (state) => {
    const {user} = state.detail
    if (!user) {
        return {
            subsidiesPerYear: null,
            requestsPerYear: null
        }
    }
    return ({
        subsidiesPerYear: user.prijimatel_roky && {
            legend: 'Prijmy',
            xLegend: state.detail.user.prijimatel_roky.roky,
            values: state.detail.user.prijimatel_roky.sumy,
        },
        requestsPerYear: user.ziadosti_stats && {
            legend: 'Ziadosti',
            xLegend: user.ziadosti_stats.roky,
            values: user.ziadosti_stats.pocet
        }
    })
}
export const DetailComponent = withRouter(connect(detailComponentSelector)(_DetailComponent))