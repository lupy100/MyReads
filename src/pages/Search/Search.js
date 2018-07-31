import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from '../../components/Book';
import * as BooksAPI from '../../api/BooksAPI';

class Search extends Component {
  state = {
    query: '',
    searchBooks: [],
    error: ''
  }

  handleChange = (query) => {
    this.setState({ query: query });
    if (query.trim().length > 0) {
      this.searchBook(query);
    } else {
      this.setState({ searchBooks: [] });
    }
  }

  searchBook = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        if (!books || books.error) {
          this.setState({ searchBooks: [], error: books.error });
        } else {

          books.map((searchbook) => {
            searchbook.shelf = 'none'
              this.props.books.map((book) => {
                if (searchbook.id === book.id) {
                  searchbook.shelf = book.shelf
                }
                  return book
              })
              return searchbook
          })

          this.setState({ searchBooks: books, error: '' })
        }
      })
  }

  render() {
    const { query, searchBooks, error } = this.state
    const { onChangeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={query} onChange={(event) => this.handleChange(event.target.value)} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          {error !== '' ?
            <ol className="books-grid">{error}</ol>
            :
            <ol className="books-grid">
              {searchBooks.map(book =>
                <Book key={book.id} data={book} onChangeShelf={onChangeShelf} />
              )}
            </ol>
          }
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Search