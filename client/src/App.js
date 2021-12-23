import './App.css';
import React, { useState } from "react";
import Form from './components/Form';

function App() {
  const [data, setData] = useState(null);

  const handleSubmit = (user, e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch("/api", requestOptions)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading.." : data}</p>
        <Form handleSubmit={handleSubmit}/>
      </header>
    </div>
  );
}

export default App;
