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
                         Sie werden von uns vorher per Email ein Ticket für den Einlass erhalten.</p>
                         <p>Sie können sich für <strong>maximal 3</strong> Personen anmelden. Um möglichst vielen Familien die Gelegenheit zur Teilnahme zu ermöglichen, bitten wir Sie, Ihre Anmeldezahl möglichst gering zu halten.</p>
                    </div>
                    <div>
                        <p>Wir freuen uns auf Ihren Besuch,</p>
                        <p>Die Schulgemeinde des AKG</p>
                    </div>
                    <div className="unterschrift">
                        <img src="https://cdn.discordapp.com/attachments/329975686389563402/929062119016656927/813776.png" height="23vh"/>
                        Ihre Anmeldedaten werden ausschließlich zur Anmeldung zum Tag der offenen Tür erhoben. Die Daten werden gemäß der DSGVO verarbeitet und nicht mit Dritten geteilt.
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
