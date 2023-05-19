import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSubjectCombinations, setSubjectList, setTestResults } from "../../store/josparFormSlice";
import "./index.css";
import { Link as RouterLink } from 'react-router-dom';
import { Subject } from "../../model/Subject";


function TestResultsComponent(){

    let subjectCombinations = useAppSelector(state => state.jospar.subjectCombinations)
    let subjectList = useAppSelector(state => state.jospar.subjectList)
    let allSubjects = useAppSelector(state => state.jospar.allSubjects)
    let testResults = useAppSelector(state => state.jospar.testResults)
    const dispatch = useAppDispatch()
    const [firstSubjectCombination, setFirstSubjectCombination] = useState({} as Subject)
    const [secondSubjectCombination, setSecondSubjectCombination] = useState({} as Subject)
    const [testResultsTemp, setTestResultsTemp] = useState([0, 0, 0, 0, 0])
    

    const handleChange =  async (value : number, index : number) => {
        const updatedResults = [...testResultsTemp];
        updatedResults[index] = value;
        console.log(index)
        console.log(value)
        setTestResultsTemp(updatedResults)
    }

    const saveToStateFirstSubjectCombination = async (subject : Subject) => {
        setFirstSubjectCombination(subject)
    }
    const saveToStateSecondSubjectCombination = async (subject : Subject) => {
        setSecondSubjectCombination(subject)
    }

    const getSubjectsByTitle = async () => {
        await axios.get(`${BASE_URL}subject/combinations/${subjectCombinations}`)
        .then(async (response) => {
            await saveToStateFirstSubjectCombination(response.data.subjectFirst)
            await saveToStateSecondSubjectCombination(response.data.subjectSecond)
        })
        .catch((err : Error) => {
            console.log("Error: ", err)
        })
    }

    const combineAllSubjects = async() => {
        let newArray = [] as Subject[]
        let testResultsTemp = [] as number[]
        newArray = [allSubjects[0], allSubjects[1], allSubjects[2], firstSubjectCombination, secondSubjectCombination]
        newArray.forEach(() => testResultsTemp.push(0))
        await saveToState(newArray, testResultsTemp)
    }


    const saveToState = async(newArray : Subject[], testResultsTemp : number[]) => {
        dispatch(setSubjectList({subjectList : newArray}))
        dispatch(setTestResults({testResults : testResultsTemp}))
    }
    const getStudentSubjects = async() => {
        await getSubjectsByTitle()
        await combineAllSubjects()
    }

    const saveJosparForm = () => {
        dispatch(setTestResults({testResults : testResultsTemp}))
    }

    
    useEffect( () => {
        getStudentSubjects()
        dispatch(setSubjectList({subjectList : subjectList}))
    }, [testResultsTemp, firstSubjectCombination, secondSubjectCombination])
    

    return(
        <div className="test-result-container">
            <p className="home-header">Соңғы рет тапсырған сынақ тестінің нәтижесін енгіз</p>
            <div className="test-results">
               {
                subjectList.map((subject, index)=>(
                    {subject} &&
                    <p key={index}>
                        {subject.title} <span><input type="number" maxLength={2} value={testResultsTemp[index]} onChange={(event) => handleChange(parseInt(event.target.value), index)}/> / {subject.point}</span>
                    </p>
                )
                )
               }
            </div>

            <RouterLink className='next-button' to="1" onClick={saveJosparForm}>Келесі</RouterLink>
            
        </div>
    )
}

export default TestResultsComponent