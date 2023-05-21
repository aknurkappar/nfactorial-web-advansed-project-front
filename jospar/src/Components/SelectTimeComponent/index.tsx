import "./index.css"
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setLoading, setTime } from "../../store/josparFormSlice";
import { Button } from "@mui/material";


function SelectTimeComponent(){

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    let subjectCombinations = useAppSelector(state => state.jospar.subjectCombinations)
    let mathTopicsState = useAppSelector(state => state.jospar.mathTopics)
    let historyTopicsState = useAppSelector(state => state.jospar.historyTopics)
    let topicsFirstSubjectState = useAppSelector(state => state.jospar.topicsFirstSubject)
    let topicsSecondSubjectState = useAppSelector(state => state.jospar.topicsSecondSubject)

    let currentStep = useAppSelector(state => state.jospar.currentStep)

    const [day, setDay] = useState(0 as number)
    const [month, setMonth] = useState(0 as number)
    const [year, setYear] = useState(0 as number)

    const generateJospar = () => {
        const days = day + month * 30 + year * 365
        dispatch(setTime({time : days}))
        navigate(`${location.pathname.slice(0, -1) + "loading"}`);
        dispatch(setLoading({isLoading : true}))
    }

    useEffect(()=>{
        console.log(day, " ", month, " ",  year)
    }, [day, month, year])

    return (
        <div className="select-time-container">
            <p className="home-header">ҰБТ-ға қалған уақытты шамамен енгіз</p>
            <div className="time-inputs">
                <div>
                    <input type="number" maxLength={2} value={day} onChange={(event) => {setDay(parseInt(event.target.value))}}/>
                    <p>Күн</p>
                </div>

                <div>
                    <input type="number" maxLength={2} value={month} onChange={(event) => {setMonth(parseInt(event.target.value))}}/>
                    <p>Ай</p>
                </div>

                <div>
                    <input type="number" maxLength={2} value={year} onChange={(event) => {setYear(parseInt(event.target.value))}}/>
                    <p>Жыл</p>
                </div>

            </div>

            <Button className='sigin-button' onClick={generateJospar}>Жоспарды генерациялау</Button>
            
        </div>
    )
}

export default SelectTimeComponent