import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material"
import "./index.css"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { BASE_URL } from "../../constants"
import axios from "axios"
import { Task } from "../../model/Task"
import { Topic } from "../../model/Topic"
import { setAllTopics, setLoading, setTime } from "../../store/josparFormSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { setJosparId } from "../../store/userSlice"

function LoadingComponent(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    
    let isLoading = useAppSelector(state => state.jospar.isLoading)

    let testResults = useAppSelector(state => state.jospar.testResults)
    let time = useAppSelector(state => state.jospar.time)

    let allTopicsState = useAppSelector(state => state.jospar.allTopics)
    let mathTopicsState = useAppSelector(state => state.jospar.mathTopics)
    let historyTopicsState = useAppSelector(state => state.jospar.historyTopics)
    let topicsFirstSubjectState = useAppSelector(state => state.jospar.topicsFirstSubject)
    let topicsSecondSubjectState = useAppSelector(state => state.jospar.topicsSecondSubject)

    let currentUserId = useAppSelector(state => state.user.currentUserId)

    const [josparId, setJosparIdState] = useState("")
    const [timeTemp, setTimeTemp] = useState(time)
    const [allTopic, setAllTopic] = useState([] as Topic[])
    const [allTask, setAllTask] = useState([] as Task[])
    const [isEmpty, setIsEmpty] = useState(true);

    let newArray : Topic[] = [] as Topic[]

    const combineAllTopics = () =>{
        const maxTopicLength = Math.max(Math.max(mathTopicsState.length, historyTopicsState.length), Math.max(topicsFirstSubjectState.length, topicsSecondSubjectState.length))
        for(let index = 0; index < maxTopicLength; index++){
            console.log(index)
            if(index < mathTopicsState.length){
                newArray.push(mathTopicsState[index])
            }
            if(index < historyTopicsState.length){
                newArray.push(historyTopicsState[index])
            }
            if(index < topicsFirstSubjectState.length){
                newArray.push(topicsFirstSubjectState[index])
            }
            if(index < topicsSecondSubjectState.length){
                newArray.push(topicsSecondSubjectState[index])
            }
        }
        setAllTopic(newArray)
        console.log(newArray)
        console.log(allTopic)
    }

    const postTask = async ({ josparId, topicFirstTask, topicSecondTask, topicThirdTask } : Task) => {
        setTimeout(()=> {
            if(josparId != ""){
                const newTask ={ josparId :josparId, topicFirstTask : topicFirstTask, topicSecondTask : topicSecondTask, topicThirdTask : topicThirdTask }
                axios.post(`${BASE_URL}task/`, newTask) 
                .then(()=>{
                    console.log(newTask)
                })
                .catch( (error : Error) => {
                    console.log("Error:", error)
                })
            }
        }, 1000)
    }

    const setAllTasks = () => {
        // create new jospar
        if(josparId == ""){
            const newJospar = {userId : currentUserId, time : time}
            axios.post(`${BASE_URL}jospar/`, newJospar)
            .then((response)=>{
                setJosparIdState(response.data.jospar._id)
                    console.log(response.data.jospar)
            })
            .catch( (error : Error) => {
                console.log("Error:", error)
            })
        }
        console.log(josparId)
        // оқу сауаттылығы - 60 пайыздан төмен болса, осы пәннен бір тапсырма қосылады, time = now, level = ""
        // if(testResults[0] <= 9){
        //     const newTask = {josparId : josparId, topic : "Оқу сауаттылығынан тест талда"}
        //     await axios.post(`${BASE_URL}task/`, newTask)
        //     .then(()=>{
        //         console.log(newTask)
        //     })
        //     .catch( (error : Error) => {
        //         console.log("Error:", error)
        //     })
        // }

        console.log(newArray)
        console.log(newArray.length)
        let indexToPost = 0
        if(newArray.length != 0){
            while(indexToPost < newArray.length){
                if(newArray[indexToPost].level == "good"){
                    indexToPost += 1
                } else if(indexToPost+2 < newArray.length){
                    if(newArray[indexToPost].level == "medium" && newArray[indexToPost+1].level == "medium"){
                        postTask({
                            josparId : josparId,
                            topicFirstTask : newArray[indexToPost].title,
                            topicSecondTask : newArray[indexToPost+1].title,
                            topicThirdTask : newArray[indexToPost+2].title
                        })
                            indexToPost += 2
                    } else {
                        postTask({
                            josparId : josparId,
                            topicFirstTask : newArray[indexToPost].title,
                            topicSecondTask : newArray[indexToPost+1].title,
                            topicThirdTask : " "
                        })
                        indexToPost += 1
                    }
                } else if(indexToPost+1 < newArray.length){
                    if(newArray[indexToPost].level == "medium" && newArray[indexToPost+1].level == "medium"){
                        postTask({
                            josparId : josparId,
                            topicFirstTask : newArray[indexToPost].title,
                            topicSecondTask : newArray[indexToPost+1].title,
                            topicThirdTask : " "
                        })
                        indexToPost += 1
                    } else {
                        postTask({
                            josparId : josparId,
                            topicFirstTask : newArray[indexToPost].title,
                            topicSecondTask : newArray[indexToPost+1].title,
                            topicThirdTask : " "
                        })
                        indexToPost += 1
                    }
                } else {
                        postTask({
                            josparId : josparId,
                            topicFirstTask : newArray[indexToPost].title,
                            topicSecondTask : " ",
                            topicThirdTask : " "
                        })
                        indexToPost += 1
                    }
                }
                //  remove saving to new array
                console.log(newArray)
                console.log(indexToPost)
            }

            // last step - activeate jospar
            axios.put(`${BASE_URL}jospar/`, josparId)
            .then((response)=>{
                console.log(response.data.jospar)
            })
            .catch( (error : Error) => {
                console.log("Error:", error)
            })

            dispatch(setJosparId({ id : josparId}))
        }
    

    
    useEffect(()=>{
        combineAllTopics()

        setAllTasks()

        setTimeout(()=>{
            dispatch(setLoading({ isLoading : false} ))
            navigate("/josparlar")
        }, 7000)
    }, [josparId])
    
    return(
        <div className="loading-container">
            {isLoading && 
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }
            {!isLoading && <div>Jospar is ready</div>}
        </div>
    )
}

export default LoadingComponent