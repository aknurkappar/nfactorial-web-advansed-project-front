import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link as RouterLink } from 'react-router-dom';
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Subject } from "../../model/Subject";
import { SubjectCombinations } from "../../model/SubjectСombinations";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSubjectCombinations } from "../../store/josparFormSlice";


function ChooseSubjectComponent(){

    let userId = useAppSelector(state => state.jospar.subjectCombinations)
    const dispatch = useAppDispatch()
    const [subjectCombinationsList, setSubjectCombinationsList] = useState([])
    const [selectedSubjectCombination, setSelectedSubjectCombination] = useState("")

    const handleChange =  async (event : SelectChangeEvent) => {
        setSelectedSubjectCombination(event.target.value)
    }

    const getSubjectList = async () =>{
        await axios.get(`${BASE_URL}subjectcombinations/`)
        .then(response => {
            setSubjectCombinationsList(response.data.subjectList)
        })
        .catch((err : Error) => {
            console.log("Error: ", err)
        })
    }

    

    useEffect(() => {
        getSubjectList()
        dispatch(setSubjectCombinations({subjectCombinations : selectedSubjectCombination}))
    }, [selectedSubjectCombination])
    
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
                            value={selectedSubjectCombination}
                            label="Пәнді таңда"
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>Пәнді таңда</em></MenuItem>

                            {
                                subjectCombinationsList.map((subject : SubjectCombinations, index: React.Key | null | undefined) => (
                                    <MenuItem key={index} value={subject.firstSubject + " " + subject.secondSubject}>{subject.firstSubject} - {subject.secondSubject}</MenuItem>
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