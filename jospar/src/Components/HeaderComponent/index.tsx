import { useEffect, useState } from 'react'
import "./index.css"
import { Button } from '@mui/material'
import LoginIcon from "../../assets/icons/icon_login.png"
import { Link } from "react-scroll";
import { useAppDispatch, useAppSelector } from '../../store';
import axios from 'axios';
import { BASE_URL } from '../../constants';


function HeaderComponentBlue() {

  let userId = useAppSelector(state => state.user.currentUserId)
  let token = useAppSelector(state => state.user.token)

const [userName, setUserName] = useState("")

const config = {
  'Content-Type' : 'application/json',
  'jwt-token' : token.toString(),
}

const getUserInfo = async () =>{
  if(userId.length > 0){
  await axios.get(`${BASE_URL}users/${userId}/`, {headers : config})
  .then(response => {
    setUserName(response.data.name)

  }).catch(err =>{
      console.log("error")
  }) 
}
}

useEffect(()=>{
  getUserInfo()
})


  return (
    <div className="header-container">
    {/* // <div className= {`"header-container" ${location.pathname === '/home' ? '' : ""}`}> */}
        <p className='logo-text'>JospaR</p>

        {userId.length == 0 &&

        <Link className='header-signin' to="signin" smooth={true} duration={600}>
        Кіру <img src={LoginIcon} alt="Кіру"/>
        </Link>
        }

        {userId.length > 0 && 
        <div className='header-text-button'> Менің кестелерім </div>
        }


        {userId.length > 0 && 
        <div className='header-text' >{userName} </div>
        }

    </div>
  )
}

export default HeaderComponentBlue
