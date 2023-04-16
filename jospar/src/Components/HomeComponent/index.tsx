import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, CircularProgress, Typography, CircularProgressProps } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import ChooseSubjectComponent from "../ChooseSubjectsComponent"
import LoadingComponent from "../LoadingComponent";

function HomeComponent(){

    const [isLoading, setLoading] = useState(true)
    const [percentage, setPercentage] = useState(0)

    // const props : CircularProgressProps & { value: number }


    useEffect(() => {
        setTimeout(()=>{
            setPercentage(percentage+10)
        }, 1000)
        if(percentage == 100){
            setLoading(false)
        }
    }, [percentage])
    

    return(
        <div id="home">
            {isLoading && 
            
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate"/>
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    >{`${Math.round(percentage)}%`}</Typography>
                </Box>
            </Box>
            
            }

            {!isLoading && <div>Jospar is ready</div>}
        </div>
        
    )
}

export default HomeComponent

