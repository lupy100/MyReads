import React from 'react'
import PropTypes from 'prop-types'

const ShelfSelect = ({ options, onChangeShelf, book }) => {

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf} onChange={e => onChangeShelf(book, e.target.value)}>
        {options.map((option, i) =>
          <option key={i} value={option.value} disabled={option.disabled}>{option.text}</option>
        )}
      </select>
    </div>
  )
}

ShelfSelect.defaultProps = {
  options: [
    {
      value: "move",
      text: "Move to...",
      disabled: true
    },
    {
      value: "currentlyReading",
      text: "Currently Reading",
      disabled: false
    },
    {
      value: "wantToRead",
      text: "Want to Read",
      disabled: false
    },
    {
      value: "read",
      text: "Read",
      disabled: false
    },
    {
      value: "none",
      text: "None",
      disabled: false
    },
  ]
}

ShelfSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  })).isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}
export default ShelfSelect
