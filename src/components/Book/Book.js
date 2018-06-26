import React from 'react'
import ShelfSelect from '../ShelfSelect'
import PropTypes from 'prop-types'

const Book = ({ title, authors, coverUrl, onChangeShelf, book }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
          <ShelfSelect onChangeShelf={onChangeShelf} book={book}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors.map(author => author).join(", ")}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  coverUrl: PropTypes.string.isRequired
}

export default Book
