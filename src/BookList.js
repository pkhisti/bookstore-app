import React from 'react';
import {Panel, DropdownButton, MenuItem} from 'react-bootstrap';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.handleMoveClick = this.handleMoveClick.bind(this);
    }

    handleMoveClick(e,id){
        this.props.handleMoveClick(e,id);
    }

    render() {
        const bookList = this.props.books.map((book)=>{
            return (
                <div className="col-sm-3 div-min-height" key={book.id}>
                    <img src={book.imageLinks.thumbnail} alt={book.title} className="img-thumbnail image-min-height"/>
                    <div className="header-min-height">{book.title}
                    <div className="title-subheader">{book.publisher}</div></div>
                    	<DropdownButton
                            bsStyle="default"
                            title="Move to.."
                            id={book.id}>
                            <MenuItem  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="currentlyReading">Currently Reading</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="wantToRead">Want to Read</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="read">Read</MenuItem>
                            <MenuItem  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="none">None</MenuItem>
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