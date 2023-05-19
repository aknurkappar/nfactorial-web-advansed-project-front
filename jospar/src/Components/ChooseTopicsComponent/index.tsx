import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import "./index.css"
import React, { useEffect } from "react";
import { useAppSelector } from "../../store";


function ChooseTopicsComponent(){
    let testResults = useAppSelector(state => state.jospar.testResults)
    const [value, setValue] = React.useState('');

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    };
    
    return(
        <div className="topic-list-container">
            <p className="home-header">Соңғы рет тапсырған сынақ тестінің нәтижесін енгіз</p>
            <div className="topic-levels">
                <p>Жақсы білемін</p>
                <p>Орташа</p>
                <p>Таныс емеспін</p>
                </div>
                
            {
                testResults.map((topic, index) => (
                    <div key={index} className="topic-title">
                        <p>{topic}</p>
                        <FormControl component="fieldset">
                            <RadioGroup value={value} onChange={handleChange}>
                                <div className="topic-options-container">
                                <FormControlLabel value="poor" control={<Radio />} label="" className="topic-options"/>
                                <FormControlLabel value="medium" control={<Radio />} label="" className="topic-options"/>
                                <FormControlLabel value="good" control={<Radio />} label="" className="topic-options"/>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                ))
            }
        </div>
    )
}

export default ChooseTopicsComponent