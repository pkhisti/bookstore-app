import React from 'react';
import {FormGroup,FormControl,InputGroup,Button} from 'react-bootstrap';
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
                 <FormGroup>
                 	<InputGroup>
                      <DebounceInput
                            className="form-control"
                            minLength={2}
                            debounceTimeout={600}
                            onChange={event => this.handleChange(event)}
                            placeholder="Search"
                            onFocus={this.props.toggleSearch} />
                    <InputGroup.Button>
                        <Button>Go!</Button>
				    </InputGroup.Button>
                    </InputGroup>
                </FormGroup>

            </div>
        )
    }
}

export default BookSearch;