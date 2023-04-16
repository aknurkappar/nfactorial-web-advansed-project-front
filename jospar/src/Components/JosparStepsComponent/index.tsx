import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link as RouterLink, Routes, Outlet } from 'react-router-dom';



function JosparStepsComponent(){


    const [showStepList, setStepList] = React.useState<string[]>([]);
    const [showUserSubjectList, setUserSubjectList] = React.useState<string[]>(
        [
            "Қазақстан тарихы",
            "Математикалық сауаттылық",
            "Математика",
            "Физика",
        ]

    );

    const [showCurrentStep, setCurrentStep] = React.useState("Cынақ тестінің нәтижесі");

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentStep(event.target.value);
      };


    useEffect(() => {
        setStepList([
            "Cынақ тестінің нәтижесі",
            ...showUserSubjectList,
            "ҰБТ-ға дейін қалған уақыт",
            ])
    
      }, [setUserSubjectList])

    const switchToNextStep = (step : string)=>{
        setCurrentStep(step)
    }

    return(
        <div className="home-content">
            <div className="steps-container">
                
                <div className="steps-menu">
            
                {
                    showStepList.map((step, index) => (
                        <RouterLink key={index}
                        className={`${showCurrentStep == step ? 'active-step' : ''}` + " " + "step-text" }
                        to={`${index}`}
                        onClick={()=>switchToNextStep(step)}
                        >{step}</RouterLink>
                    ))
                }
                </div>
                <div className="spec-step-container">
                    <Outlet/>
                </div>
                
           </div>

        </div>
    )

}

export default JosparStepsComponent