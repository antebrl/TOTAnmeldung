import React, { useState, useEffect } from "react";
import "../styles/inputs.css"

const Inputs = () => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [dependants, setDependants] = useState(2)
    const [time, setTime] = useState(null);
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState(null);
    const [color, setColor] = useState(null);
    const [options, setOptions] = useState(null);


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
    };
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch("/api/persons", requestOptions)
            .then((res) => {
                res.json()
                .then((data) => {
                    console.log(data);
                    const {first, second, warteliste1, warteliste2} = data;
                    if(warteliste1 && warteliste2) {
                        setOptions('<option disabled selected hidden>Alle Zeiträume bereits ausgebucht</option>');
                        setAlert(true);
                        setText("<strong>Das Event ist leider schon voll ausgebucht!</strong> Bitte haben Sie Verständnis.")
                        setColor("alert-problem");
                        return;
                    }
                    let firstText = '';
                    let secondText = '';
                    if(!warteliste1) firstText = first ? '<option style="color: red">09:00-11:00 Warteliste</option>' : '<option>09:00-11:00</option>';
                    if(!warteliste2) secondText = second ? '<option style="color: red">11:30-13:30 Warteliste</option>' : '<option>11:30-13:30</option>';
                    setOptions(`<option disabled selected hidden>Zeitraum wählen</option>${firstText}${secondText}`);
                });
            });
    }, []);

    const changeOption = (zeit) => {
        if(zeit.includes("Warteliste")) {
            setAlert(true);
            setText("<strong>Dieser Zeitraum ist bereits ausgebucht!</strong> </br> Sie tragen sich nur in die Warteliste<strong>Warteliste</strong> ein.");
            setColor("alert-problem");
        } else {
            setAlert(false);
        }
        setTime(zeit);
    };

    return(
        <div className="Inputs">
            <form className="form" onSubmit={(e) => submit(e)}>
                <div className="in">
                        <label>Vorname des begleitenden Elternteils</label>
                        <input type={"text"} placeholder="Vorname" onChange={(e) => {setName(e.target.value)}} required/>
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
                        <select value={time} onChange={(e) => {changeOption(e.target.value)}} dangerouslySetInnerHTML={{__html: options}} required/>
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
