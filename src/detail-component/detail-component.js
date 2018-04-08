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
        const {subsidiesPerYear, requestsPerYear, records, requests} = this.props
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
            <table className="table">
                <thead>
                <caption className="text-center w-100">Prijmy</caption>
                <tr>
                    <th>Meno</th>
                    <th>Opatrenie</th>
                    <th>Kód opatrenia</th>
                    <th>PSČ</th>
                    <th>Rok</th>
                    <th>Suma</th>
                </tr>
                </thead>
                <tbody>
                {records.map(({meno, opatrenie, opatrenie_kod, psc, rok, suma}) => <tr>
                    <td>{meno}</td>
                    <td>{opatrenie}</td>
                    <td>{opatrenie_kod}</td>
                    <td>{psc}</td>
                    <td>{rok}</td>
                    <td>{suma}</td>
                </tr>)}
                </tbody>
            </table>

            <table className="table">
                <thead>
                <caption className="text-center w-100">Žiadosti</caption>
                <tr>
                    <th>Diel</th>
                    <th>IČO</th>
                    <th>Lokalita</th>
                    <th>Meno</th>
                    <th>Rok</th>
                    <th>Výmera</th>
                </tr>
                </thead>
                <tbody>
                {requests.map(({diel, ico, lokalita, meno, rok, vymera}) => <tr>
                    <td>{diel}</td>
                    <td>{ico}</td>
                    <td>{lokalita}</td>
                    <td>{meno}</td>
                    <td>{rok}</td>
                    <td>{vymera}</td>
                </tr>)}
                </tbody>
            </table>
        </div>
    }
}

const detailComponentSelector = (state) => {
    const {user} = state.detail
    if (!user) {
        return {
            subsidiesPerYear: null,
            requestsPerYear: null,
            records: [],
            requests: [],
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
        },
        records: user.prijimatel_records || [],
        requests: user.prijimatel_ziadosti || [],
    })
}
export const DetailComponent = withRouter(connect(detailComponentSelector)(_DetailComponent))