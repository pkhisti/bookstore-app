import React from 'react';
import {Panel, DropdownButton, MenuItem} from 'react-bootstrap';

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMoveClick(e){
        console.log(e)
    }

    render() {
        const bookList = this.props.books.map((book)=>{
            return (
                <div className="col-sm-3 div-min-height" key={book.id}>
                    <img src={book.imageLinks.thumbnail} alt={book.title} className="img-thumbnail image-min-height"/>
                    <div className="header-min-height"><h5>{book.title}</h5></div>
                    	<DropdownButton
                            bsStyle="default"
                            title="Move to.."
                            id={book.id}>
                            <MenuItem  onSelect={e => this.handleMoveClick(e)} eventKey="1">Currently Reading</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e)} eventKey="2">Want to Read</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e)} eventKey="3">Read</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e)} eventKey="4">None</MenuItem>
                        </DropdownButton>
                </div>
            )
        })
        return(
             <div>
                <Panel header={this.props.heading}>
                  <div className="row">
                    {bookList}
                    </div>
                </Panel>
            </div>
        )
    }
}

export default BookList;