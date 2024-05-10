import React from 'react'
import './header.css'
import LogoImg from "../../assets/logo.svg"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className= 'container'>
      <Link to="/">
        <img src={LogoImg} alt="Logo cripto app" />
      </Link>
    </header>
  )
}

export default Header
