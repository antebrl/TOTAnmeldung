import React, { useState } from "react";
import "../styles/inputs.css"

const Inputs = () => {

    const [dependants, setDependants] = useState(1)

    return(
        <div className="inputs">
                <div>
                    <label id="name">Name</label>
                    <input type={"text"} placeholder="Name"></input>
                </div>
        </div>
    )
}

export default Inputs
