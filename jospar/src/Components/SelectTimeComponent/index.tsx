import "./index.css"
import { Link as RouterLink } from 'react-router-dom';
import { useState } from "react";


function SelectTimeComponent(){

    return (
        <div className="select-time-container">
            <p className="home-header">ҰБТ-ға қалған уақытты шамамен енгіз</p>
            <div className="time-inputs">
                <div>
                    <input type="number" maxLength={2}/>
                    <p>Күн</p>
                </div>

                <div>
                    <input type="number" maxLength={2}/>
                    <p>Ай</p>
                </div>

                <div>
                    <input type="number" maxLength={2}/>
                    <p>Жыл</p>
                </div>

            </div>

            <RouterLink className='generate-button' to="/home/josparlar/1" >Жоспарды генерациялау</RouterLink>
            
        </div>
    )
}

export default SelectTimeComponent