import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import React from "react";


function SignupComponent(){
    const [showPasswordFirst, setPasswordFirst] = React.useState(false);
    const [showPasswordSecond, setPasswordSecond] = React.useState(false);
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
                <p className="signup-header">Жоспарға қосыл!</p>

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="sigup-form">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment">Есіміңіз</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            label="Есіміңіз"
                            style={{ width: '300px', borderRadius:'17px'}}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment"
                            label="Email"
                            style={{ width: '300px', borderRadius:'17px'}}
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
                        />
                    </FormControl>

                    <div>
                    <Button variant="contained" component="label" className='sigup-image-button' startIcon={<AddPhotoAlternate />}>
                    Сурет таңдау
                        <input type="file" accept="image/png, image/jpeg, image/jpg" hidden/>
                    </Button>
                        <Button className='sigup-button'>Тіркелу</Button>
                    </div>

                    </div>
                </Box>
                <p className='form-footer'>Тіркелген болсаң, <Link className='form-footer-button' to="signin" smooth={true} duration={600}>кіруге өт</Link></p>
            </div>
        </div>

    )
}

export default SignupComponent