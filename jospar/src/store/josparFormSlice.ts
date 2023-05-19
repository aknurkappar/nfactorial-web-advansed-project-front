import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subject } from "../model/Subject";

interface UserState {
    subjectCombinations : String
    subjectList : Subject[]
    allSubjects : Subject[]
    testResults : number[],
    topicsFirstSubject : String
    topicsSecondSubject : String
    time : String;
}


const initialState: UserState = {
    subjectCombinations : '',
    subjectList : [] as Subject[],
    allSubjects :  [] as Subject[],
    testResults : [0, 0, 0, 0, 0] as number[],
    topicsFirstSubject : '',
    topicsSecondSubject : '',
    time : ''
};


const josparFormSlice = createSlice({
    name: "josparjasa",
    initialState,
    reducers: {
        setSubjectCombinations : (state, action: PayloadAction<{subjectCombinations : String}>) => {
            state.subjectCombinations = action.payload.subjectCombinations
            // console.log(state.subjectCombinations)
        },
        setSubjectList : (state, action: PayloadAction<{subjectList : Subject[]}>) => {
            state.subjectList = action.payload.subjectList
            // console.log(state.subjectList)
        },
        setSubjectAll : (state, action: PayloadAction<{subjectList : Subject[]}>) => {
            state.allSubjects = action.payload.subjectList
            // console.log(state.allSubjects)
        },
        setTestResults : (state, action: PayloadAction<{testResults : number[]}>) => {
            state.testResults = action.payload.testResults
        },
        setTopicsFirstSubject : (state, action: PayloadAction<{topicsFirstSubject : String}>) => {
            state.topicsFirstSubject = action.payload.topicsFirstSubject
            console.log(state.topicsFirstSubject)
        },
        setTopicsSecondSubject : (state, action: PayloadAction<{topicsSecondSubject : String}>) => {
            state.topicsSecondSubject = action.payload.topicsSecondSubject
            console.log(state.topicsSecondSubject)
        },
        setTime : (state, action: PayloadAction<{time : String}>) => {
            state.time = action.payload.time
            console.log(state.time)
        },
    }
});

export const { setSubjectCombinations, setSubjectList, setSubjectAll, setTestResults, setTopicsFirstSubject, setTopicsSecondSubject, setTime } = josparFormSlice.actions

export default josparFormSlice.reducer;
