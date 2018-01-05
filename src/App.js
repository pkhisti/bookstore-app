import React, { Component } from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap'
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';
import BookSearch from './BookSearch';

class App extends Component {
  //AIzaSyCupPRPb1lZp8cLz0c3hU_Pm28zO1rV4u0
  constructor(props){
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      alreadyRead: [],
      allBooks: [],
      loadData:false
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((data)=>{
      console.log(data);
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

  render() {
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
          <BookSearch />
          <BookList books={this.state.currentlyReading} heading="Currently Reading"/>
          <BookList books={this.state.wantToRead} heading="Want To Read"/>
          <BookList books={this.state.alreadyRead} heading="Already Read"/>
        </div>
      </div>
    );
  }
}

export default App;
