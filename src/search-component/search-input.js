import React from 'react'
import axios from 'axios'
import {v4} from 'uuid'
import {debounce} from 'lodash'
import {config} from 'config'

const {api_root} = config

class _SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleOnSearch = this.handleOnSearch.bind(this)
        this.debouncedSearch = debounce(this.debouncedSearch, 500)
        this.state = {value: '', result: []}
    }

    handleOnSearch(value) {
        this.setState({value})
        this.debouncedSearch(value)
    }

    async debouncedSearch(value) {
        const {data} = await axios.get(`${api_root}po/group?q=${encodeURIComponent(value)}`)
        this.setState({result: data})
    }

    render() {
        const {value, result} = this.state
        return (<React.Fragment>
            <label>Search:</label>
            <input type="text" value={value} onChange={(evt) => this.handleOnSearch(evt.target.value)}/>
            <pre>{result.map(({meno, rok, suma_all}) => <React.Fragment key={v4()}>
                <h1>{meno}</h1>
                <p>{rok}</p>
                <p>{suma_all}</p>
                <hr/>
            </React.Fragment>)}</pre>
        </React.Fragment>)
    }
}

export const SearchInput = _SearchInput
