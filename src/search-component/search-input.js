import React from 'react'


class _SearchInput extends React.Component {
	constructor(props){
		super(props);
		this.handleOnSearch = this.handleOnSearch.bind(this);
		this.state={value:''}
	}
	
	handleOnSearch(evt) {
		this.setState({value:evt.target.value})
	}
	
	render(){
		const { value } = this.state
		return (<React.Fragment>
			<label>Search:</label>
			<input type="text" value={value} onChange={this.handleOnSearch} />
		</React.Fragment>)
	}
}

export const SearchInput = _SearchInput
