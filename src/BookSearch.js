import React from 'react';
import {FormGroup,FormControl} from 'react-bootstrap';

class BookSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query: ""
        }
    }
    render() {
        return (
            <div>
                 <FormGroup>
                    <FormControl type="text" placeholder="Search" />
                </FormGroup>

            </div>
        )
    }
}

export default BookSearch;