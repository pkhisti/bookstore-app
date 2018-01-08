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
      searchResult: [],
      query: ""
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
      if(data != undefined) {
        if(data.length > 0) {
            this.setState({
              searchResult: data,
              query: query
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
                <Link className="pullright" to="/">Go Back</Link>
                <br/>
                <br/>
               <BookSearch className="search-box" onSearch={this.handleSearch} quuery={this.state.query}/>
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
                <a href="#">My Bookstore</a>
              </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
        </header>
        <div className="container">
              <Route path="/" component={Main}/>
              <Route path="/search" component={Search}/>
          </div>
      </div>
    );
  }
}

export default App;
