import "./index.css";
import { Link } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, WindowRounded }from '@mui/icons-material';
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { ChangeEvent } from "react";
import { setCurrentUser } from "../../store/userSlice.js";
import { useAppDispatch , useAppSelector} from "../../store";


function SigninComponent(){

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [errorMessageActive, setErrorMessageActive] = useState(false)

    let userId = useAppSelector(state => state.user.currentUserId)
    const dispatch = useAppDispatch()

    const login = async () => {
        const user = {
            "email" : email,
            "password" : password,
        }

        await axios.post(`${BASE_URL}users/login/`, user)
        .then(async (response)=>{
            window.scrollTo({top : 0, behavior : "smooth"})
            setEmail("")
            setPassword("")
            handleScroll()

            dispatch(setCurrentUser( {id : response.data.user.id, token : response.data.token } ))
            localStorage.setItem('token', response.data.token)         
        })
        .catch( (error : Error) => {
            setErrorMessage(error.message)
            setErrorMessageActive(true)
            setTimeout(()=>{
                setErrorMessageActive(false)
            }, 3000)
        })
    }

    const handleEmailInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleScroll = () =>{
        window.scrollTo({ top: 0 });
    }
    

    return (
        <div id="signin" className="signin-container">
            <div className="signin-content">
                
            <p className={`error-message ${errorMessageActive ? "error-message-active" : ""}`}>{errorMessage}</p>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="sigin-form">
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
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Құпиясөз"
                            style={{ width: '300px', borderRadius:'17px', padding: ' 0 20px 0 0'}}
                            value = {password}
                            onChange={handlePasswordInputChange}
                        />
                    </FormControl>

                    <Button className='sigin-button'
                          onClick={login}
                    >Кіру</Button>

                    

                    </div>
                </Box>
                <p className='form-footer'>Әлі тіркелмеген болсаң, <Link className='form-footer-button' to="signup" smooth={true} duration={600}>тіркелуге өт</Link></p>
            </div>
        </div>

    )
}

const mapStateToProps = (state: { counter: any; }) => {
    return {

    };
  };
//   mapDispatchToProps

export default connect(mapStateToProps)(SigninComponent);

function err(reason: any): PromiseLike<never> {
    throw new Error("Function not implemented.");
}
