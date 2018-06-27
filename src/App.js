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
    BooksAPI.getAll()
      .then(data => {
        this.setState({
          books: data
        })
      })
  }

  onChangeShelf = (book, shelf) => {
    const { books } = this.state;
    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    let stateBooks = books;

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = shelf;
      stateBooks.push(newBook);
    } else {
      stateBooks[bookIndex] = Object.assign({}, stateBooks[bookIndex]);
      stateBooks[bookIndex].shelf = shelf;
    }

    BooksAPI.update(book, shelf)
      .then(
        this.setState({ books: stateBooks })
      );
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