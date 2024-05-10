import React from 'react'
import './header.css'
import LogoImg from "../../assets/logo.svg"
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <header className= 'container'>
      <Link to="/">
        <img src={LogoImg} alt="Logo cripto app" />
      </Link>
    </header>
  )
}

export default header
