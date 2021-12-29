import React, { useState } from "react";
import axios from "axios"
import "../styles/inputs.css"

const Inputs = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dependants, setDependants] = useState(1)
    const [time, setTime] = useState("")

    //Changes Dependants if user input is invalid.
    const handleDependants = (e) => {
        console.log(e.target.value)
        if(e.target.value > 5) setDependants(5)
        else if (e.target.value < 1) setDependants(1)
        else setDependants(e.target.value)
    }

    const submit = () => {
        axios.post(`http://localhost:3001/api/person`, {
            vorname: name,
            name: lastName,
            email: email,
            zeit: time,
            personen: dependants
        }).then(res => console.log(res))
    }

    const validateSubmit = () => {
        if(!name || !lastName || !email || !dependants || !time) {
            alert("Du Huso")
            return
        }
        if(!isNaN(name) || !isNaN(lastName)) {
            alert("Du Misset")
            return
        }
        submit()
    }

    return(
        <div className="Inputs">
                <div className="in">
                    <label>Name</label>
                    <input type={"text"} placeholder="Name" onChange={(e) => {setName(e.target.value)}}></input>
                </div>
                <div className="in">
                    <label>Nachname</label>
                    <input type={"text"} placeholder="Nachname" onChange={(e) => {setLastName(e.target.value)}}></input>
                </div>
                <div className="in">
                    <label>Email</label>
                    <input type={"email"} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="in">
                    <label>Personen</label>
                    <input type={"number"} value={dependants} min={1} max={5} onChange={(e) => {handleDependants(e)}}></input>
                </div>
                <div className="in">
                    <label>Uhrzeit</label>
                    <select onChange={(e) => {setTime(e.target.value)}}>
                        <option>09:00-11:00</option>
                        <option>11:30-13:30</option>
                    </select>
                </div>
                <div className="submit">
                    <button onClick={validateSubmit}>Anmelden</button>
                </div>
        </div>
    )
}

export default Inputs
