import "./index.css";
import { Link } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff }from '@mui/icons-material';
import React from "react";
import { connect, useSelector } from "react-redux";


function SigninComponent(){

    const userList = useSelector((state) => state.users.users);

    const [showPassword, setShowPassword] = React.useState(false);
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="sigin-form">
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
                        />
                    </FormControl>

                    <Button component={RouterLink} to="/home/josparjasa" className='sigin-button'
                          onClick={handleScroll}
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
      counter: state.userList,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    // return bindActionCreators(actions, dispatch);
    return {
      increment: () => dispatch(actions.increment),
      decrement: () => dispatch(actions.decrement),
      random: () => dispatch(actions.random),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SigninComponent);