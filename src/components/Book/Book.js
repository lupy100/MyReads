import React from 'react'
import ShelfSelect from '../ShelfSelect'
import PropTypes from 'prop-types'

const Book = ({ onChangeShelf, data }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${data.imageLinks.smallThumbnail})` }}></div>
          <ShelfSelect onChangeShelf={onChangeShelf} book={data}/>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{data.authors && data.authors.map(author => author).join(", ")}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  // onChangeShelf: PropTypes.string.isRequired,
  // data: PropTypes.array.isRequired,
}

export default Book
