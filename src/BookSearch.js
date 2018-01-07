import React from 'react';
import {FormGroup,FormControl,InputGroup,Button} from 'react-bootstrap';

class BookSearch extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onSearch(e.target.value);
	}


    render() {
        return (
            <div>
                 <FormGroup>
                 	<InputGroup>
                    <FormControl type="text" value={this.props.query} placeholder="Search"  onFocus={this.props.toggleSearch}	onChange={this.handleChange} />
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