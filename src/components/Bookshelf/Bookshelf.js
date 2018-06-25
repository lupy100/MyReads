import React from 'react'
import PropTypes from 'prop-types'

const Bookshelf = ({ title, children }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {children}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Bookshelf
