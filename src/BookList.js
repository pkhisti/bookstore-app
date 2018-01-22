import React from 'react';
import {Panel, DropdownButton, MenuItem} from 'react-bootstrap';

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.handleMoveClick = this.handleMoveClick.bind(this);
    }

    handleMoveClick = (e,id) =>{
        this.props.handleMoveClick(id,e);
    }

    render() {
        const bookList = this.props.books.map((book)=>{
            const src = book.imageLinks && book.imageLinks.thumbnail? book.imageLinks.thumbnail :"http://via.placeholder.com/128x193?text=No%20Cover";
            return (
                <div className="col-sm-3 div-min-height" key={book.id}>
                    <img src={src} alt={book.title} className="img-thumbnail image-min-height"/>
                    <div className="header-min-height">{book.title}
                    <div className="title-subheader">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                    </div>
                    	<DropdownButton
                            bsStyle="default"
                            title="Move to.."
                            id={book.id}>
                            <MenuItem active={book.shelf==="currentlyReading"}  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="currentlyReading">Currently Reading</MenuItem>
                            <MenuItem active={book.shelf==="wantToRead"}  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="wantToRead">Want to Read</MenuItem>
                            <MenuItem active={book.shelf==="read"}  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="read">Read</MenuItem>
                            <MenuItem active={book.shelf==="none"}  onSelect={e => this.handleMoveClick(e,book.id)} eventKey="none">None</MenuItem>
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