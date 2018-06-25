import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/Bookshelf'
import Book from './components/Book/Book';

class BooksApp extends React.Component {
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf title="Currently reading">
                  {this.shelfFilfer("currentlyReading").map(book =>
                    <Book key={book.id} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} />
                  )}
                </Bookshelf>
                <Bookshelf title="Want to read">
                  {this.shelfFilfer("wantToRead").map(book =>
                    <Book key={book.id} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} />
                  )}
                </Bookshelf>
                <Bookshelf title="Read">
                  {this.shelfFilfer("read").map(book =>
                    <Book key={book.id} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} />
                  )}
                </Bookshelf>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
