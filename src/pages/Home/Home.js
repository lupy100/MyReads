import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../api/BooksAPI'
import Bookshelf from '../../components/Bookshelf'
import Book from '../../components/Book';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(data => {
        this.setState({
          books: data
        })
      })
  }

  shelfFilfer = (filtro) => {
    const { books } = this.state
    return books.filter(book => book.shelf === filtro).map(book => book)
  }

  onChangeShelf = (book, shelf) => {
    const { books } = this.state
    let newBook = book
    //Muda o tipo de estante dele
    newBook.shelf = shelf
    //Adiciona no array esse livro com o novo tipo de estante 
    this.setState({
      books: books.filter((b) => b.id !== newBook.id).concat(newBook)
    })
    //Manda pra API o livro
    BooksAPI.update(newBook, shelf)
  }

  render() {
    const { books } = this.state

    const booksCurrentRead = books.filter(book => book.shelf === 'currentlyReading').map(book => book)
    const booksWantRead = books.filter(book => book.shelf === 'wantToRead').map(book => book)
    const booksRead = books.filter(book => book.shelf === 'read').map(book => book)

    console.log('Books State', books)
    console.log("Current Read", booksCurrentRead)
    console.log("Want Read", booksWantRead)
    console.log("Read", booksRead)

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently reading">
              {this.shelfFilfer("currentlyReading").map(book =>
                <Book key={book.id} book={book} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} onChangeShelf={this.onChangeShelf} />
              )}
            </Bookshelf>
            <Bookshelf title="Want to read">
              {this.shelfFilfer("wantToRead").map(book =>
                <Book key={book.id} book={book} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} onChangeShelf={this.onChangeShelf} />
              )}
            </Bookshelf>
            <Bookshelf title="Read">
              {this.shelfFilfer("read").map(book =>
                <Book key={book.id} book={book} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} onChangeShelf={this.onChangeShelf} />
              )}
            </Bookshelf>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
