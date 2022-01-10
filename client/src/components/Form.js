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
                        <p>Zum Tag der offenen Tür am Akg.</p> 
                        <p>Für die gesamte Veranstaltung gilt <strong>2G Plus</strong>.
                        Bitte bringen Sie einen negativen Test sowie Impf- beziehungsweise Genesenennachweis mit. (für Schulkinder unter 18 reicht das Testheft)</p>
                    </div>
                    <div>
                         <p>Sie werden von uns vorher per Email ein <strong>Ticket</strong> für den Einlass erhalten.</p>
                         <p>Sie können sich für <strong>maximal 3</strong> Personen anmelden. Um möglichst vielen Familien die Gelegenheit zur Teilnahme zu ermöglichen, bitten wir Sie, Ihre Anmeldezahl möglichst gering zu halten.</p>
                         <p>Bei Fragen oder Problemen sowie zur Abmeldung vom Event oder Änderung Ihrer Daten melden Sie sich bitte an: direktion@akg-bensheim.de</p>
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
