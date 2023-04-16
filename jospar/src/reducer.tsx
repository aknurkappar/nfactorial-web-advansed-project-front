import { Reducer, Action } from "redux";

import { AppState } from "./types"

const initialState = {
    selectedSubjects : [
      {name : "Қазақстан тарихы", point : 0,
      allTopics : [
        { title : "Ерте орта ғасырлардағы Қазақстан", status : "poor"},
        { title : "VI-IX ғасырлардағы отырықшылар  және көшпелілер мәдениеті", status : "poor"},
        { title : "Орта ғасырлардағы Қазақстан", status : "poor"},
        { title : "Қазақстан территориясындағы Ұлы Жібек жолы", status : "poor"},
        { title : "X ғ-XIII ғасырдың басындағы Қазақстан мәдениеті", status : "poor"},
    ]},
      {name : "Математикалық сауаттылық", point : 0 , allTopics : []},
      {name : "Математика", point : 0 , allTopics : []},
      {name : "Физика", point : 0, allTopics : []},
  ]
};

export const reducer: Reducer<AppState, Action> = (state = initialState, action)  => {
    switch (action.type) {
        default:
        return state;
    }
}
