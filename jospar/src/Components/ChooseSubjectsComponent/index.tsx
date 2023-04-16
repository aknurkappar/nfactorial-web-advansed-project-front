import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link as RouterLink } from 'react-router-dom';


function ChooseSubjectComponent(){


    const [showSubjectList, setSubjectList] = React.useState<string[]>([]);

    const [showSelectedSubject, setSelectedSubject] = React.useState("");
    

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSubject(event.target.value);
      };

    useEffect(() => {
    setSubjectList([
        "Шығармашылық емтихан",
        "Дүниежүзілік тарих және Құқық негіздері",
        "География және Шетел тілі",
        "Химия және Биология",
        "Қазақ тілі және Қазақ әдебиеті",
        "Математика және Информатика",
        "Математика және Физика"
        ])
      })

    const switchToNextStep = ()=>{

    }

    
    return(
        <div className="home-content" id="">
                <p className="home-header">Нақты, жеке жоспарпен дайындалатын уақыт келді!</p>
                <p className="additional-text">Форманы толтыру 8 минут алады</p>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className="home-form">
                    <FormControl sx={{ m: 1, minWidth: 120 }} className="select-subject" >
                        <InputLabel id="demo-select-small">Пәнді таңда</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={showSelectedSubject}
                            label="Пәнді таңда"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Пәнді таңда</em></MenuItem>

                            {
                                showSubjectList.map((subject, index) => (
                                    <MenuItem key={index} value={subject}>{subject}</MenuItem>
                                ))
                            }
                    </Select>
                    </FormControl>
                    </div>
                </Box>
                <RouterLink className='next-button' to="qadamdar">Келесі</RouterLink>
            </div>
    )

}

export default ChooseSubjectComponent