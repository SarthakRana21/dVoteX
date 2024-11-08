import React from "react";

export default function Login(props) {
    return (
        <div className="login-container">
            <h1 className="welcome-message">welcome to Decentralized Voting Application</h1>
            <button className="login-button" onClick={props.connectWallet}>Login to Metamask</button>
        </div>
    )
}