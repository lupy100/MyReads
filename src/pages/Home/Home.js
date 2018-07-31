import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from '../../components/Bookshelf'
import Book from '../../components/Book';


const Home = ({books,onChangeShelf }) => {
  const shelfFilfer = (filtro) => {
    return books.filter(book => book.shelf === filtro).map(book => book)
  }
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf title="Currently reading">
            {shelfFilfer("currentlyReading").map(book =>
              <Book key={book.id} data={book} onChangeShelf={onChangeShelf} />
            )}
          </Bookshelf>
          <Bookshelf title="Want to read">
            {shelfFilfer("wantToRead").map(book =>
              <Book key={book.id} data={book} onChangeShelf={onChangeShelf} />
            )}
          </Bookshelf>
          <Bookshelf title="Read">
            {shelfFilfer("read").map(book =>
              <Book key={book.id} data={book} onChangeShelf={onChangeShelf} />
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

Home.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Home
