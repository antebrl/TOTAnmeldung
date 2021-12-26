import React from "react";
import "./styles/app.css"
import Form from "./components/Form";
import Header from "./components/Header";
import Hinweise from "./components/Hinweise";

function App() {
  return (
    <div className="App">
      <Header />
      <Hinweise />
      <Form />
    </div>
  )
}

export default App;
