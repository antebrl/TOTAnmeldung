import React, { useState } from "react";
import "../styles/inputs.css"

const Inputs = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dependants, setDependants] = useState(2)
    const [time, setTime] = useState("09:00-11:00")


    const submit = (e) => {
       e.preventDefault()

       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            vorname: name,
            name: lastName,
            email: email,
            zeit: time,
            personen: dependants
            })
        };

        fetch("/api/person", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                alert("Erfolg. Ihnen wurde eine Email zugesendet.")
            });
    }

    return(
        <div className="Inputs">
            <form onSubmit={(e) => submit(e)}>
                <div className="in">
                        <label>Name</label>
                        <input type={"text"} placeholder="Name" onChange={(e) => {setName(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>Nachname</label>
                        <input type={"text"} placeholder="Nachname" onChange={(e) => {setLastName(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>Email</label>
                        <input type={"email"} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="in">
                        <label>Personen</label>
                        <input type={"number"} value={dependants} min={1} max={5} onChange={(e) => {setDependants(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>Uhrzeit</label>
                        <select onChange={(e) => {setTime(e.target.value)}} required>
                            <option>09:00-11:00</option>
                            <option>11:30-13:30</option>
                        </select>
                    </div>
                    <div className="submit">
                        <input type={"submit"} value={"Anmelden"}></input>
                </div>
            </form>
        </div>
    )
}

export default Inputs
