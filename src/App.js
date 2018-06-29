import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import * as BooksAPI from './api/BooksAPI'

import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import NotFound from './pages/NotFound/NotFound';

import './App.css'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    });
  }

  getAllBooks() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    })
  }

  render() {
    const { books } = this.state
    return (

      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact render={() => (
              <Home books={books} onChangeShelf={this.onChangeShelf} />
            )} />

            <Route path="/search" render={() => (
              <Search books={books} onChangeShelf={this.onChangeShelf} />
            )} />

            <Route path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;