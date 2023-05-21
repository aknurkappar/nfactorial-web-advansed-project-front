import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subject } from "../model/Subject";
import { Topic } from "../model/Topic";
import { SelectedTopic } from "../model/selectedTopic";

interface UserState {
    subjectCombinations : String
    subjectList : Subject[]
    allSubjects : Subject[]
    testResults : number[],
    historyTopics : Topic[],
    mathTopics : Topic[],
    topicsFirstSubject : Topic[],
    topicsSecondSubject : Topic[],
    allTopics : Topic[],
    time : number;
    currentStep : number,
    isLoading : boolean
}

const initialState: UserState = {
    subjectCombinations : '',
    subjectList : [] as Subject[],
    allSubjects :  [] as Subject[],
    testResults : [0, 0, 0, 0, 0] as number[],
    historyTopics : [] as Topic[],
    mathTopics : [] as Topic[],
    topicsFirstSubject : [] as Topic[],
    topicsSecondSubject : [] as Topic[],
    allTopics : [] as Topic[],
    time : 0,
    currentStep : 1,
    isLoading : false
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
        setHistoryTopics : (state, action: PayloadAction<{topics : Topic[]}>) => {
            state.historyTopics = action.payload.topics
        },
        setMathTopics : (state, action: PayloadAction<{topics : Topic[]}>) => {
            state.mathTopics = action.payload.topics
        },
        setTopicsFirstSubject : (state, action: PayloadAction<{topics : Topic[]}>) => {
            state.topicsFirstSubject = action.payload.topics
        },
        setTopicsSecondSubject : (state, action: PayloadAction<{topics : Topic[]}>) => {
            state.topicsSecondSubject = action.payload.topics
        },
        setAllTopics : (state, action: PayloadAction<{topics : Topic[]}>) => {
            state.allTopics = action.payload.topics
        },
        setTime : (state, action: PayloadAction<{time : number}>) => {
            state.time = action.payload.time
            console.log(state.time)
        },
        setCurrentStep : (state, action: PayloadAction<{step : number}>) => {
            state.currentStep = action.payload.step
            console.log(state.currentStep)
        },
        setLoading : (state, action: PayloadAction<{isLoading : boolean}>) => {
            state.isLoading = action.payload.isLoading
            console.log(state.isLoading)
        },
    }
});

export const { setSubjectCombinations,
    setSubjectList,
    setSubjectAll,
    setTestResults,
    setHistoryTopics,
    setMathTopics,
    setTopicsFirstSubject,
    setTopicsSecondSubject,
    setAllTopics,
    setTime,
    setCurrentStep,
    setLoading
} = josparFormSlice.actions

export default josparFormSlice.reducer;
