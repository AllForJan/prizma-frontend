import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {debounce} from 'lodash'
import {config} from '../config'
import {createAction} from "../entries/actions";
import {toCurrency} from "../utils/number";
import './search-input.css'

const {api_root} = config

class _SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleOnSearch = this.handleOnSearch.bind(this)
        this.debouncedSearch = debounce(this.debouncedSearch, 500)
        this.loadResult = debounce(this.loadResult, 500)
    }

    handleOnSearch(field, value) {
        const {dispatch} = this.props
        dispatch(createAction(`SET_SEARCH_${field}`, value))
        this.debouncedSearch()
    }

    debouncedSearch() {
        setTimeout(() => {
            this.loadSuggestions()
            this.loadResult()
        })
    }

    async loadSuggestions() {
        const {dispatch, name} = this.props
        dispatch(createAction('LOADER_START'))
        const {data} = await axios.get(`${api_root}autocomplete?q=${encodeURIComponent(name)}`)
        dispatch(createAction('LOADER_END'))
        dispatch(createAction('SET_SEARCH_SUGGESTIONS_NAME', data))
    }

    async loadResult() {
        const {dispatch, name, sum_from, sum_to, year_from, year_to} = this.props
        const params = [
            `?q=${encodeURIComponent(name)}&`,
            `suma_from=${encodeURIComponent(sum_from)}&`,
            `suma_to=${encodeURIComponent(sum_to)}&`,
            `rok_from=${encodeURIComponent(year_from)}&`,
            `rok_to=${encodeURIComponent(year_to)}&`
        ].join('')
        dispatch(createAction('LOADER_START'))
        const {data} = await axios.get(`${api_root}po/list${params}`)
        dispatch(createAction('LOADER_END'))
        dispatch(createAction('SET_SEARCH_RESULT', data))
    }

    render() {
        const {name, year_from, year_to, sum_from, sum_to, result, s_name, dispatch} = this.props
        return (
            <React.Fragment>
                <div className="jumbotron text-center">
                    <p>Vyhladavanie:</p>
                    <div className="row search-part">
                        <div className="col-sm-6">
                            <label className="row">
                                <span className="col-2">Meno:</span>
                                <input type="text" value={name}
                                       onChange={(evt) => this.handleOnSearch('NAME', evt.target.value)}/>
                            </label>
                            <label className="row">
                                <span className="col-2">Roky:</span>
                                <input className="year" type="number" value={year_from} onChange={(evt) => {
                                    dispatch(createAction('SET_SEARCH_YEAR_FROM', evt.target.value))
                                    this.loadResult()
                                }}/>&nbsp;-&nbsp;
                                <input type="number" value={year_to} onChange={(evt) => {
                                    dispatch(createAction('SET_SEARCH_YEAR_TO', evt.target.value))
                                    this.loadResult()
                                }}/>
                            </label>
                            <label className="row">
                                <span className="col-2">Suma:</span>
                                <input type="number" value={sum_from} onChange={(evt) => {
                                    dispatch(createAction('SET_SEARCH_SUM_FROM', evt.target.value))
                                    this.loadResult()
                                }}/>&nbsp;-&nbsp;
                                <input type="number" value={sum_to} onChange={(evt) => {
                                    dispatch(createAction('SET_SEARCH_SUM_TO', evt.target.value))
                                    this.loadResult()
                                }}/>
                            </label>
                        </div>
                        <div
                            className="search-suggestions col-sm-6"
                            ref={(suggestionNode) => {
                                this.suggestionNode = suggestionNode
                            }}
                        >
                            {s_name.map(({data: {meno, rok, suma}}) => (
                                <div className="suggestion row" onClick={() => {
                                    dispatch(createAction('SET_SEARCH_NAME', meno))
                                    setTimeout(() => {
                                        this.debouncedSearch()
                                    })
                                }}>
                                    <div className="col-sm-6 text-left">{meno}</div>
                                    <div className="col-sm-2">{rok}</div>
                                    <div className="col-sm-4 text-right">{toCurrency(suma)}</div>
                                </div>))}
                        </div>
                    </div>
                </div>
                <pre className="search-results container-fluid text-center">
                    {result.map(({_id, data: {meno, obec, rok, suma}}) => (
                        <div className="row" key={_id}>
                            <div className="col-sm-5 text-left">{meno}</div>
                            <div className="col-sm-3">{`Obec: ${obec}`}</div>
                            <div className="col-sm-2">{`Rok: ${rok}`}</div>
                            <div className="col-sm-2">{`Suma: ${toCurrency(suma)}`}</div>
                        </div>
                    ))}
                    </pre>
            </React.Fragment>)
    }
}

const searchInputSelector = (state) => ({
    name: state.searchInput.name || '',
    year_from: state.searchInput.year_from || '',
    year_to: state.searchInput.year_to || '',
    sum_from: state.searchInput.sum_from || '',
    sum_to: state.searchInput.sum_to || '',
    result: state.searchInput.result || [],
    s_name: state.searchInput.s_name || [],
})

export const SearchInput = connect(searchInputSelector)(_SearchInput)
