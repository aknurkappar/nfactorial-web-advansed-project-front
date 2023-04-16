import { Button } from '@mui/material'
import { useState } from 'react'
import Paper3D from "../../assets/3d/paper3d.webp"
import SigninComponent from "../SigninComponent"
import { Link } from "react-scroll";
import "./index.css"

function WelcomeComponent() {

  return (
    <div className='welcome-container'>
      <div className='welcome-content'>
        <div className='welcome-left'>
          <p>Әр пәннен тақырыптар тізімі</p>
          <p>Соңғы сынақ тестінен алған балл</p>
          <p>ҰБТ-ға дейін қалған уақыт</p>
        </div>

        <img src={Paper3D}/>

        <p className='big-text'>ТЕК САҒАН АРНАЛҒАН ҰБТ-ҒА ДАЙЫНДЫҚ ЖОСПАРЫ!</p>
      </div>

      <Link className='bastau-button' to="signup" smooth={true} duration={600}>Бастау</Link>
    </div>
    
  )
}

export default WelcomeComponent
