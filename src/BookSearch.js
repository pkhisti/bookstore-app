import React from 'react';
import {DebounceInput} from 'react-debounce-input';

class BookSearch extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.state = {
        //     query: ""
        // }
    }

    handleChange(e) {
        this.props.onSearch(e.target.value);
        //console.log(e.target.value)
        // this.setState({
        //      query: e.target.value
        // })
	}

    render() {
        return (
            <div>
            <DebounceInput
                className="form-control"
                minLength={2}
                debounceTimeout={600}
                onChange={event => this.handleChange(event)}
                placeholder="Search"
                onFocus={this.props.toggleSearch} />
            </div>
        )
    }
}

export default BookSearch;