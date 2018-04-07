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
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(createAction('HIDE_SUGGESTION'))
    }

    handleOnSearch(field, value) {
        const {dispatch} = this.props
        dispatch(createAction(`SET_SEARCH_${field}`, value))
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
        const {name, suggestions_hidden, year_from, year_to, sum_from, sum_to, result, s_name, show_advanced, dispatch} = this.props
        return (
            <React.Fragment>
                <div className="col-md-6 offset-3 search-input">
                    <input ref={(searchInput) => {
                        this.searchInput = searchInput
                    }} type="text" value={name} className="form-control search-input shadow"
                           placeholder="Zadajte PO"
                           onChange={(evt) => {
                               evt.persist()
                               this.handleOnSearch('NAME', evt.target.value)
                               setTimeout((() => {
                                   evt.target === this.searchInput && this.loadSuggestions()
                               }).bind(this))
                           }}
                           onBlur={() => {
                               setTimeout(() => {
                                   this.loadResult()
                                   dispatch(createAction('HIDE_SUGGESTION'))
                               }, 200)
                           }}
                    />
                    {suggestions_hidden || <div
                        className="search-suggestions"
                        ref={(suggestionNode) => {
                            this.suggestionNode = suggestionNode
                        }}
                    >
                        {s_name.map(({data: {meno, rok, suma}}) => (
                            <div className="suggestion" onClick={() => {
                                dispatch(createAction('SET_SEARCH_NAME', meno))
                                setTimeout(() => {
                                    this.loadResult()
                                    dispatch(createAction('HIDE_SUGGESTION'))
                                })
                            }}>
                                {meno}
                                {/*<div className="col-sm-6 text-left">{meno}</div>*/}
                                {/*<div className="col-sm-2">{rok}</div>*/}
                                {/*<div className="col-sm-4 text-right">{toCurrency(suma)}</div>*/}
                            </div>))}
                    </div>}

                </div>

                <div className="col-md-6 offset-6">
                    <button type="button" className="btn btn-light" onClick={() => {
                        dispatch(createAction('SET_SHOW_ADVANCED', !show_advanced))
                    }}>
                        {show_advanced ? '▲' : '▼'}
                    </button>
                </div>

                {this.props.show_advanced &&
                <div className="row animated fadeInDown text-center">

                    <div className="row col-md-6">

                        <input className="year" placeholder="Rok od" type="number" value={year_from}
                               onChange={(evt) => {
                                   dispatch(createAction('SET_SEARCH_YEAR_FROM', evt.target.value))
                                   setTimeout((() => {
                                       this.loadResult()
                                   }).bind(this))
                               }}/>

                        <input type="number" className="year" placeholder="Rok do" value={year_to}
                               onChange={(evt) => {
                                   dispatch(createAction('SET_SEARCH_YEAR_TO', evt.target.value))
                                   setTimeout((() => {
                                       this.loadResult()
                                   }).bind(this))
                               }}/>
                    </div>

                    <div className="col-md-6">

                        <input type="number" value={sum_from} onChange={(evt) => {
                            dispatch(createAction('SET_SEARCH_SUM_FROM', evt.target.value))
                            setTimeout((() => {
                                this.loadResult()
                            }).bind(this))
                        }}/>
                        <input type="number" value={sum_to} onChange={(evt) => {
                            dispatch(createAction('SET_SEARCH_SUM_TO', evt.target.value))
                            setTimeout((() => {
                                this.loadResult()
                            }).bind(this))
                        }}/>
                    </div>
                </div>
                }


                {/*list result*/}
                <div
                    className="search-results container-fluid text-center">
                    {result.map(({_id, data: {meno, obec, rok, suma}}) => (

                        <div className="row" key={_id}>

                            <div className="col-sm-5">
                                <h5>{meno}</h5>
                            </div>
                            <div className="col-sm-2">{obec}</div>
                            <div className="col-sm-2">{rok}</div>

                            {toCurrency(suma)}
                        </div>
                    ))
                    }
                </div>

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
    show_advanced: state.searchInput.show_advanced || false,
    suggestions_hidden: state.searchInput.suggestions_hidden,
})

export const SearchInput = connect(searchInputSelector)(_SearchInput)
