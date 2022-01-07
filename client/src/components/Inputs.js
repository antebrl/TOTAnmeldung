import React, { useState } from "react";
import "../styles/inputs.css"

const Inputs = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dependants, setDependants] = useState(2)
    const [time, setTime] = useState("09:00-11:00")
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState(null);
    const [color, setColor] = useState(null);


    const submit = (e) => {
       e.preventDefault()

       setAlert(true)
       setText("Lädt..")

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
            .then((res) => {
                setColor(res.status === 201 ? "alert-sucess" : "alert-problem");
                res.json()
                .then((data) => {
                    setAlert(true);
                    setText(data.message);
                });
            });
    }

    return(
        <div className="Inputs">
            <form className="form" onSubmit={(e) => submit(e)}>
                <div className="in">
                        <label>Vorname des begleitenden Elternteils</label>
                        <input type={"text"} placeholder="Name" onChange={(e) => {setName(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>Nachname des begleitenden Elternteils</label>
                        <input type={"text"} placeholder="Nachname" onChange={(e) => {setLastName(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>E-Mail-Adresse für die Zusendung der Anmeldebestätigung</label>
                        <input type={"email"} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="in">
                        <label>Wie viele Personen möchten gemeinsam Einlass haben?</label>
                        <input type={"number"} value={dependants} min={1} max={3} onChange={(e) => {setDependants(e.target.value)}} required/>
                    </div>
                    <div className="in">
                        <label>Für welchen Zeitraum möchten Sie sich anmelden?</label>
                        <select onChange={(e) => {setTime(e.target.value)}} required>
                            <option>09:00-11:00</option>
                            <option>11:30-13:30</option>
                        </select>
                    </div>
                    <div className="submit">
                        <input type={"submit"} value={"Anmelden"}></input>
                </div>
            </form>

           {alert &&
            <div className={color}>
                <a href="#" className="close" onClick={() => setAlert(false)}>x</a>
                <p className="message" dangerouslySetInnerHTML={{__html: text}}/>
            </div>
           }

        </div>
    )
}

export default Inputs
