import "./index.css";
import { Link } from "react-scroll";
import { Box, IconButton, Button, OutlinedInput, InputLabel, InputAdornment, FormControl, Select, MenuItem, CircularProgress, Typography, CircularProgressProps, Grid } from '@mui/material';
import { Visibility, VisibilityOff, AddPhotoAlternate }from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import ChooseSubjectComponent from "../ChooseSubjectsComponent"
import LoadingComponent from "../LoadingComponent";
import { useSelector } from "react-redux";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppDispatch, useAppSelector } from "../../store";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { Task } from "../../model/Task";

function HomeComponent(){
    
    const dispatch = useAppDispatch()

    let josparId = useAppSelector(state => state.user.josparId)
    let taskList = [] as Task[]

    const getJosparTasks = async () => {
        if(josparId != ""){
            await axios.get(`${BASE_URL}task/jospar/${josparId}`)
            .then(async (response) => {
                
                const taskData = response.data.taskList
                taskList = taskData
            })
            .catch((err : Error) => {
                console.log("Error: ", err)
            })
        }
    }

    useEffect(()=>{
        getJosparTasks()
    }, [])


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

                {
                    <Grid container spacing={2}>
                        {taskList.map((item, index) => (
                          <Grid item xs={1} key={index}>
                            {item.topicFirstTask}
                            {item.topicSecondTask}
                            {item.topicThirdTask}
                          </Grid>
                        ))}
                      </Grid>
                }
                
            </div>

        </div>
        
    )
}

export default HomeComponent

