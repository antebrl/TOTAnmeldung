import React from "react";
import "../styles/form.css";
import Inputs from "./Inputs";

const Form = () => {
    return(
        <div className="form wrapper">
            <div className="Form">
                <div className="hinweise">
                    <h1>Hinweise</h1>
                    <div>
                        <p>Herzlich Willkommen,</p> 
                        <p>Zum Tag der offenen Tür am Akg. Für die gesamte Veranstaltung gilt <strong>2G Plus</strong>.
                        Bitte bringen Sie einen negativen Test sowie Impf- beziehungsweise Genesenennachweis mit.</p>
                    </div>
                    <div>
                        <p>Die Einlasszeiten begrenzen sich auf <strong>9:30 - 10:30Uhr</strong> sowie auf <strong>11:00 - 12:00Uhr</strong>. 
                         Sie werden von uns ein digitales Ticket für den Einlass erhalten.</p>
                    </div>
                </div>
                <div className="register">
                    <h1>Anmeldung</h1>
                    <Inputs />
                </div>
            </div>
        </div>
    )
}

export default Form
