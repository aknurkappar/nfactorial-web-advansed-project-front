import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, CircularProgress, Typography, CircularProgressProps } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import ChooseSubjectComponent from "../ChooseSubjectsComponent"
import LoadingComponent from "../LoadingComponent";
import { useSelector } from "react-redux";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function HomeComponent(){
    

    return(
        <div id="home" className="home-content">
            <div className="plan-container">
                <div className="plan-header">
                    <NavigateNextIcon className="next-icon left-next-icon"/>
                    <p>Дүй</p>
                    <p>Сей</p>
                    <p>Сәр</p>
                    <p>Бей</p>
                    <p>Жұм</p>
                    <p>Сен</p>
                    <p>Жек</p>
                    <NavigateNextIcon className="next-icon"/>
                </div>
                
            </div>

        </div>
        
    )
}

export default HomeComponent

