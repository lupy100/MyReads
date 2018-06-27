import React from 'react'
import ShelfSelect from '../ShelfSelect'
import PropTypes from 'prop-types'

const Book = ({ onChangeShelf, data }) => {
  const style = {
    width: 128,
    height: 193,
    backgroundImage: `url(${data.imageLinks ? data.imageLinks.smallThumbnail : ''})`
  }
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}></div>
          <ShelfSelect onChangeShelf={onChangeShelf} book={data}/>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{data.authors && data.authors.map(author => author).join(", ")}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

export default Book
