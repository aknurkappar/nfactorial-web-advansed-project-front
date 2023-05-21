import './App.css'
import { Routes, Route } from "react-router-dom";
import WelcomeComponent from "./Components/WelcomeComponent/index"
import HeaderComponent from "./Components/HeaderComponent/index"
import SignupComponent from "./Components/SignupComponent/index"
import SigninComponent from "./Components/SigninComponent/index"
import HomeComponent from "./Components/HomeComponent/index"
import ChooseSubjectComponent from './Components/ChooseSubjectsComponent/index';
import TestResultsComponent from "./Components/TestrResultsComponent/index"
import ChooseTopicsComponent from"./Components/ChooseTopicsComponent/index"
import SelectTimeComponent from "./Components/SelectTimeComponent/index"
import PageNotFoundComponent from "./Components/PageNotFoundComponent/index"
import JosparStepsComponent from "./Components/JosparStepsComponent/index"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';
import { useAppDispatch, useAppSelector } from './store';
import { setSubjectAll } from './store/josparFormSlice';
import { Subject } from './model/Subject';
import LoadingComponent from './Components/LoadingComponent';

function App() {

  // const localStorageToken = localStorage.getItem('token');
  // const [localStorageTokenIsValid, setLocalStorageTokenIsValid] = useState(false)

  // const checkValidToken = async () =>{
  //   if(token){
  //     await axios.get(`${BASE_URL}users/isValidToken/`,
  //       {headers : {
  //         'Content-Type' : 'application/json',
  //         'jwt-token' : localStorageToken
  //       }})
  //     .then(response => {
  //       setLocalStorageTokenIsValid(true)
  //     }).catch(err =>{
  //         console.log("error")
  //     }) 
  // }
  // }

let currentStep = useAppSelector(state => state.jospar.currentStep)

let userId = useAppSelector(state => state.user.currentUserId)
let token = useAppSelector(state => state.user.token)

const [userName, setUserName] = useState("")
const [userHaveJospar, setUserHaveJospar] = useState(false)
const config = {
  'Content-Type' : 'application/json',
  'jwt-token' : token.toString(),
}

let subjectList = useAppSelector(state => state.jospar.subjectList)
let allSubjects = useAppSelector(state => state.jospar.allSubjects)
const dispatch = useAppDispatch()

const getUserInfo = async () =>{
  if(userId.length > 0){
  await axios.get(`${BASE_URL}users/${userId}/`, {headers : config})
  .then(response => {
    setUserName(response.data.name)

  }).catch((error : Error )=>{
      console.log(error.message)
  }) 
 
  await axios.get(`${BASE_URL}jospar/${userId}/`)
  .then(response => {
      if(response.data.jospar.length != 0){
          console.log(response.data.jospar)
          setUserHaveJospar(true)
      }
  }).catch(err =>{
      console.log("error")
  })   
}
}

const getSubjectList = async () =>{
  await axios.get(`${BASE_URL}subject/`)
  .then(response => {
    dispatch(setSubjectAll({subjectList : response.data.subjectList}))
  })
  .catch((err : Error) => {
      console.log("Error: ", err)
  })

}

useEffect(()=>{
  getUserInfo()
  getSubjectList()
  console.log(currentStep)
  
}, [])

  return (

    <div>
    <HeaderComponent/>

      <Routes>

        {userId.length == 0 && 
          <Route path="/" element = {<div>
          <WelcomeComponent />
          <SigninComponent />
          <SignupComponent />
        </div>} />}

        {userId.length > 0 && userHaveJospar && <Route path="/" element={<HomeComponent />}/>}
        {!userHaveJospar && <Route path="/" element={<ChooseSubjectComponent />}/>}

        <Route path="/josparjasa" element={<ChooseSubjectComponent />}/>
        
        <Route path="/josparjasa/qadamdar" element= {<JosparStepsComponent />}>
          <Route path="" element= {<TestResultsComponent />}/>
          <Route path="0" element= {<TestResultsComponent />}/>
          <Route path=":currentStep" element= {<ChooseTopicsComponent subject={subjectList[currentStep]}/>}/>
          <Route path="5" element= {<SelectTimeComponent />}/>
          <Route path="loading" element= {<LoadingComponent />}/>
          <Route path="*" element= {<PageNotFoundComponent />}/>
        </Route>

        <Route path="/qadamdar" element= {<JosparStepsComponent />}>
          <Route path="" element= {<TestResultsComponent />}/>
          <Route path="0" element= {<TestResultsComponent />}/>
          <Route path=":currentStep" element= {<ChooseTopicsComponent subject={subjectList[currentStep]}/>}/>
          <Route path="5" element= {<SelectTimeComponent />}/>
          <Route path="loading" element= {<LoadingComponent />}/>
          <Route path="*" element= {<PageNotFoundComponent />}/>
        </Route>
        <Route path="/josparlar" element={<HomeComponent/>} />
        <Route/>
      </Routes>
    </div>
  )

    
          {/* <Route path="1" element= {<ChooseTopicsComponent subject={subjectList[1]}/>}/>
          <Route path="2" element= {<ChooseTopicsComponent subject={subjectList[2]}/>}/>
          <Route path="3" element= {<ChooseTopicsComponent subject={subjectList[3]}/>}/>
          <Route path="4" element= {<ChooseTopicsComponent subject={subjectList[4]}/>}/> */}
}



export default App
