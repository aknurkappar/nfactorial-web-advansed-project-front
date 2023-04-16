import "./index.css";
import { AppState } from "../../types"
import { Link as RouterLink } from 'react-router-dom';


function TestResultsComponent({ selectedSubjects } : AppState){
    
    return(
        <div className="test-result-container">
            <p className="home-header">Соңғы рет тапсырған сынақ тестінің нәтижесін енгіз</p>
            <div className="test-results">
               {
                selectedSubjects.map((subject, index)=>
                    <p key={index}>
                        {subject.name} <input type="number" maxLength={2} value={subject.point} />
                    </p>
                )
               }
            </div>

            {/* <RouterLink className='next-button' to="/home/josparjasa/qadamdar/1">Келесі</RouterLink> */}
            
        </div>
    )
}

export default TestResultsComponent