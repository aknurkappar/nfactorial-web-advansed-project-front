import { useState } from 'react'
import "./index.css"
import { Button } from '@mui/material'
import LoginIcon from "../../assets/icons/icon_login.png"
import { Link } from "react-scroll";


function HeaderComponentBlue() {
  return (
    <div className="header-container">
    {/* // <div className= {`"header-container" ${location.pathname === '/home' ? '' : ""}`}> */}
        <p className='logo-text'>JospaR</p>
        <Link className='header-signin' to="signin" smooth={true} duration={600}>
        Кіру <img src={LoginIcon} alt="Кіру"/>
        </Link>
    </div>
  )
}

export default HeaderComponentBlue
