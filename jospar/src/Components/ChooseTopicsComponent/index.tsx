import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import "./index.css"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { Topic } from "../../model/Topic";
import { setCurrentStep, setHistoryTopics, setLoading, setMathTopics, setTopicsFirstSubject, setTopicsSecondSubject } from "../../store/josparFormSlice";
import { SelectedTopic } from "../../model/selectedTopic";
import { AirlineSeatIndividualSuiteSharp } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import {  Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChooseTopicsProps {
    subject: any;
}

const ChooseTopicsComponent : React.FC<ChooseTopicsProps>  = ({subject}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    let testResults = useAppSelector(state => state.jospar.testResults)
    let mathTopicsState = useAppSelector(state => state.jospar.mathTopics)
    let historyTopicsState = useAppSelector(state => state.jospar.historyTopics)
    let topicsFirstSubjectState = useAppSelector(state => state.jospar.topicsFirstSubject)
    let topicsSecondSubjectState = useAppSelector(state => state.jospar.topicsSecondSubject)

    let currentStep = useAppSelector(state => state.jospar.currentStep)
    
    const [topicList, setTopicList] = useState([] as Topic[]);
    const [topicListTemp, setTopicListTemp] = useState([] as Topic[]);
    const [values, setValues] = useState([] as string[]);
    const [isEmpty, setIsEmpty] = useState(true);


    const handleChange = (value : string, index : number) => {
        let newState : Topic[] = [...topicListTemp] as Topic[]
        newState[index] = { ...newState[index], level: value }
        setTopicListTemp(newState)
        console.log(topicListTemp)
    };

    const saveToState = (topics : Topic[]) =>{
        if(subject.title == "Математикалық сауаттылық"){
            dispatch(setMathTopics({ topics: topics }))
            setTopicListTemp(mathTopicsState)
        } else if(subject.title == "Қазақстан тарихы"){
            dispatch(setHistoryTopics({ topics: topics }))
            setTopicListTemp(historyTopicsState)
        } else if(subject.title == "Математика"){
            dispatch(setTopicsFirstSubject({ topics: topics }))
            setTopicListTemp(topicsFirstSubjectState)
        } else {
            dispatch(setTopicsSecondSubject({ topics: topics }))
            setTopicListTemp(topicsSecondSubjectState)
        }
    }

    const unsetLevelValues = (topics : Topic[]) => {
        topics.forEach((element: Topic) => {
            element.level = '';
        })
    }

    const getSubjectTopics = async () => {
        await axios.get(`${BASE_URL}topic/subject/${subject.title}`)
        .then(async (response) => {
            const topicsData = response.data.topicList as Topic[]
            console.log(topicsData)
            unsetLevelValues(topicsData)
            saveToState(topicsData)
            setIsEmpty(false)
        })
        .catch((err : Error) => {
            console.log("Error: ", err)
        })
    }
    
    const handleNextStep = async () => {
        saveToState(topicListTemp)
        setTopicListTemp([] as Topic[])
        setIsEmpty(true)
        navigate(`${location.pathname.slice(0, -1) + (currentStep + 1).toString()}`);
        dispatch(setCurrentStep({ step: (currentStep + 1) }))
    }

    useEffect(()=>{
        console.log(subject.title)
        getSubjectTopics()
        if(topicListTemp.length == 0) getSubjectTopics()
    }, [currentStep, isEmpty])
    

    return(
        <div className="topic-list-container">
            <p className="home-header">Соңғы рет тапсырған сынақ тестінің нәтижесін енгіз</p>
            <div className="topic-levels">
                <p>Жақсы білемін</p>
                <p>Орташа</p>
                <p>Таныс емеспін</p>
                </div>
            {
                topicListTemp.map((topic, index) => (
                    <div key={index} className="topic-title">
                        <p>{topic.title}</p>
                        <FormControl component="fieldset">
                            <RadioGroup value={topic.level} onChange={(event) => {handleChange(event.target.value, index)}}>
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
            <Button className='sigin-button' onClick={handleNextStep}>Келесі</Button>
        </div>
    )
}

export default ChooseTopicsComponent