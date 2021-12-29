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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Elit at imperdiet dui accumsan sit amet. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus. Aliquam ultrices sagittis orci a scelerisque purus semper eget. Pellentesque habitant morbi tristique senectus et netus et. Duis convallis convallis tellus id interdum velit laoreet id donec. Nunc eget lorem dolor sed viverra. Nulla facilisi nullam vehicula ipsum a arcu. Tristique et egestas quis ipsum.</p>
                    </div>
                    <div>
                        <p>Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Scelerisque eu ultrices vitae auctor. Ipsum dolor sit amet consectetur adipiscing elit. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Mi eget mauris pharetra et ultrices. At erat pellentesque adipiscing commodo. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Semper eget duis at tellus. Cursus vitae congue mauris rhoncus aenean vel. Et ultrices neque ornare aenean euismod elementum nisi quis.</p>
                    </div>
                </div>
                <div className="register">
                    <h1>Anmeldung</h1>
                    <Inputs />
                </div>
            </div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=43" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}

export default Form
