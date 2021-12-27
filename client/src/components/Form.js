import React, { useState } from "react";
import "../styles/form.css";

const Form = () => {
    const [dependants, setDependants] = useState(1)

    return(
        <div className="Form">
            <div className="names">
                <input type={"text"} placeholder="Vorname"></input>
                <input type={"text"} placeholder="Nachname"></input>
            </div>
            <input type={"email"} placeholder="Email"></input>
            <div className="reservierung">
                <div>
                    <label id="personen">Personen</label>
                    <input type={"number"} min={1} max={5} value={dependants} onChange={(e) => setDependants(e.target.value)}></input>
                </div>
                <div>
                    <label id="uhrzeit">Uhrzeit</label>
                    <select>
                        <option value={"09:00-11:00"}>09:00-11:00</option>
                        <option value={"11:30-13:30"}>11:30-13:30</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Form
