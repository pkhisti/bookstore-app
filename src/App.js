import React, { Component } from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap'
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';
import BookSearch from './BookSearch';
import {Link, Route} from 'react-router-dom';

class App extends Component {
  //AIzaSyCupPRPb1lZp8cLz0c3hU_Pm28zO1rV4u0
  constructor(props){
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      alreadyRead: [],
      allBooks: [],
      loadData:false,
      isSearching: false,
      searchResult: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);
    this.handleMoveClick = this.handleMoveClick.bind(this);

  }

  componentDidMount() {
   this.fetchData();
  }

  fetchData() {
     BooksAPI.getAll().then((data)=>{
      let currentlyReading =  data.filter((item)=>item.shelf === "currentlyReading");
      let wantToRead =  data.filter((item)=>item.shelf === "wantToRead");
      let alreadyRead =  data.filter((item)=>item.shelf === "read");
      this.setState({
        allBooks: data,
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        alreadyRead: alreadyRead,
        loadData:true
      });
    });
  }

  handleMoveClick = (id,shelf) => {
     BooksAPI.update(id,shelf).then((data)=>{
        this.fetchData();
     });
  }

  handleSearch(query) {
     BooksAPI.search(query).then((data)=>{
      if(data !== undefined) {
        if(data.length > 0) {
          //check the shelf of the books from the search result and all book state
           data = data.map((book)=>{
             let existingBook = this.state.allBooks.filter((item)=>item.id === book.id);
             if(existingBook.length > 0 ) {
               book.shelf = existingBook[0].shelf;
             }
             return book;
           });
            this.setState({
              searchResult: data
            });
          } else {
         this.setState({
          searchResult: []
        });
      }
      } else {
         this.setState({
          searchResult: []
        });
      }
    });
  }
  render() {
    const searchPage = window.location.href.split("/")[3];
    const Main  = (props) => {
        return (
           <div>
             <Link className="pullright" to="/search">Search Books</Link>
              <br/>
              <br/>
              <BookList books={this.state.currentlyReading} heading="Currently Reading" handleMoveClick={this.handleMoveClick}/>
              <BookList books={this.state.wantToRead} heading="Want To Read" handleMoveClick={this.handleMoveClick}/>
              <BookList books={this.state.alreadyRead} heading="Already Read" handleMoveClick={this.handleMoveClick}/>
            </div>
        )
    }
  const Search  = (props) => {
        return (
           <div>
               <BookList books={this.state.searchResult} heading="Search Result" handleMoveClick={this.handleMoveClick}/>
            </div>
        )
      }

    return (
      <div className="App">
        <header className="App-header">
           <Navbar>
              <Navbar.Header>
              <Navbar.Brand>
                My Bookstore
              </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
        </header>
        <div className="container">
              <Route exact path="/" component={Main}/>
              <Link className={"pullright " + (searchPage==='search' ? '' : 'hidden')}  to="/">Go Back</Link>
              <br/>
              <br/>
              <div className={(searchPage==='search' ? '' : 'hidden')}>
              <BookSearch  className="search-box" onSearch={this.handleSearch} />
              </div>
              <br/>
              <br/>
              <Route exact path="/search" component={Search}/>
          </div>
      </div>
    );
  }
}

export default App;
