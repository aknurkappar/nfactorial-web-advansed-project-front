import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants";
import { useState } from "react";
import { User } from "../../model/User";
import { ChangeEvent } from "react";
import axios, { AxiosError, AxiosResponse } from 'axios';
import userSlice from "../../store/userSlice";


function SignupComponent(){
    const [showPasswordFirst, setPasswordFirst] = useState(false);
    const [showPasswordSecond, setPasswordSecond] = useState(false);
    
    const [name, setName]  = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [errorMessageActive, setErrorMessageActive] = useState(false)

    const register = async () => {
        const newUser = {
            "name" : name,
            "email" : email,
            "password" : password,
            "passwordCheck" : passwordCheck
        }

        await axios.post(`${BASE_URL}users/register/`, newUser)
        .then(()=>{
            console.log(newUser)
            window.scrollTo({top : 0, behavior : "smooth"})
            setName("")
            setEmail("")
            setPassword("")
            setPasswordCheck("")
        })
        .catch( error => {
            setErrorMessage(error.response.data.message)
            setErrorMessageActive(true)
            setTimeout(()=>{
                setErrorMessageActive(false)
            }, 3000)
        })
    }

    const handleNameInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }


    const handleEmailInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handlePasswordCheckInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(event.target.value)
    }

    
    const handleClickShowPasswordFirst = () =>{
        setPasswordFirst(!showPasswordFirst)
    }

    const handleClickShowPasswordSecond = () =>{
        setPasswordSecond(!showPasswordSecond)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    return (
        <div id="signup" className="signup-container">
            <div className="signup-content">
            <p className={`error-message ${errorMessageActive ? "error-message-active" : ""}`}>{errorMessage}</p>
                <p className="signup-header">Жоспарға қосыл!</p>
    
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="sigup-form">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment">Есіміңіз</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            label="Есіміңіз"
                            style={{ width: '300px', borderRadius:'17px'}}
                            value = {name}
                            onChange={handleNameInputChange}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            label="Email"
                            style={{ width: '300px', borderRadius:'17px'}}
                            value = {email}
                            onChange={handleEmailInputChange}
                        />
                    </FormControl>
                    

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Құпиясөз</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordFirst ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordFirst}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPasswordFirst ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Құпиясөз"
                            style={{ width: '300px', borderRadius:'17px', padding: ' 0 20px 0 0'}}
                            value = {password}
                            onChange={handlePasswordInputChange}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Құпиясөзді қайта енгізіңіз</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordSecond ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordSecond}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPasswordSecond ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Құпиясөзді қайта енгізіңіз"
                            style={{ width: '300px', borderRadius:'17px', padding: ' 0 20px 0 0'}}
                            value = {passwordCheck}
                            onChange={handlePasswordCheckInputChange}
                        />
                    </FormControl>

                    <div>
                    <Button variant="contained" component="label" className='sigup-image-button' startIcon={<AddPhotoAlternate />}>
                    Сурет таңдау
                        <input type="file" accept="image/png, image/jpeg, image/jpg" hidden/>
                    </Button>
                        <Button className='sigup-button' onClick={register}>Тіркелу</Button>
                    </div>

                    </div>
                </Box>
                <p className='form-footer'>Тіркелген болсаң, <Link className='form-footer-button' to="signin" smooth={true} duration={600}>кіруге өт</Link></p>
            </div>
        </div>

    )
}

export default SignupComponent