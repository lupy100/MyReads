import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <center>
      <h1>404 Página não encontrada</h1>
      <br /> <br />
      <Link to="/"> Voltar para home</Link>
    </center>
  )
}

export default NotFound
