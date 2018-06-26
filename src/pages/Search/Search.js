import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from '../../components/Book';
import * as BooksAPI from '../../api/BooksAPI';

export default class Search extends Component {
  state = {
    query: '',
    books: [],
    searchBooks: []
  }

  handleChange = (query) => {
    this.setState({ query: query.trim() });
    if (query.trim().length > 0) {
      this.searchBook(query);
    }
  }

  searchBook = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        if (!books || books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books })
        }
    })
  }

  render() {
    const { query, books, searchBooks } = this.state

    console.log(this.state)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" value={query} onChange={(event) => this.handleChange(event.target.value)} placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
             {searchBooks.map(book =>
              <Book key={book.id} book={book} title={book.title} authors={book.authors} coverUrl={book.imageLinks.smallThumbnail} />
            )} 
          </ol>
        </div>
      </div>
    )
  }
}
