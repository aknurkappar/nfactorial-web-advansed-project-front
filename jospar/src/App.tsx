import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Router, Route, useRoutes} from "react-router-dom";
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
import { useSelector } from 'react-redux';
import { AppState } from "./types"

function App() {

  const selectedSubjects = useSelector((state: AppState) => state.selectedSubjects);

  return (

    <div>
    <HeaderComponent/>
      <Routes>
        <Route path="/" element = {<div>
        <WelcomeComponent />
        <SigninComponent />
        <SignupComponent />
      </div>} />
        
        <Route path="home" element={<HomeComponent />}/>
        <Route path="home/josparjasa" element={<ChooseSubjectComponent />}/>
        <Route path="home/josparjasa/qadamdar" element= {<JosparStepsComponent />}>
          <Route path="" element= {<TestResultsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="0" element= {<TestResultsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="1" element= {<ChooseTopicsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="2" element= {<ChooseTopicsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="3" element= {<ChooseTopicsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="4" element= {<ChooseTopicsComponent selectedSubjects={selectedSubjects}/>}/>
          <Route path="5" element= {<SelectTimeComponent />}/>
          <Route path="*" element= {<PageNotFoundComponent />}/>
        </Route>
        <Route path="/home/josparlar/1" element={<HomeComponent/>} />
        <Route/>
      </Routes>
    </div>
  )
}

export default App
