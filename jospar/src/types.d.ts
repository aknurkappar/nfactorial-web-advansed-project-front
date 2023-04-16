interface Topic{
  title : string,
  status : string
}

interface Subject{
  name : string,
  point : number,
  allTopics : Topic[]
}


export interface AppState {
  selectedSubjects : Subject[]
}