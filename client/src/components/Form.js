import React, { useState } from "react";

const Form = ({handleSubmit}) => {
  const [vorname, setVorname] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zeit, setZeit] = useState('10:00 - 11:00');
  const [personen, setPersonen] = useState(1);

  return (
    <div className="form">
        <div>
            <h1>User Registration</h1>
        </div>

        <form className="form" onSubmit={(e) => handleSubmit({name:name, vorname:vorname, email:email, personen:personen, zeit:zeit}, e)}>
            <label className="label">Vorname</label>
            <input onChange={(e) => setVorname(e.currentTarget.value)} className="input" value={vorname} type="text" required />

            <label className="label">Name</label>
            <input onChange={(e) => setName(e.currentTarget.value)} className="input" value={name} type="text" required />

            <label className="label">Email</label>
            <input onChange={(e) => setEmail(e.currentTarget.value)} className="input" value={email} type="email" required />

            <label className="label">Personen</label>
            <select onChange={(e) => setPersonen(e.currentTarget.value)} className="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>

            <label className="label">Zeit</label>
            <select onChange={(e) => setZeit(e.currentTarget.value)} className="select">
                <option>10:00 - 11:00</option>
                <option>11:30 - 12:00</option>
            </select>


            <button className="btn" type="submit">
                Submit
            </button>
        </form>
    </div>
  );
}

export default Form;