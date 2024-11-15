import React from "react";

const Connected = (props) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            {props.remainingTime > 0 ? <p className="connected-account">Remaining Time: {props.remainingTime}</p> : <h2>Voting Ended</h2>}
            { props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    <label>Enter Candidate Index</label> <br />
                    <input
                    type="number" 
                    placeholder="Index" 
                    value={props.number} 
                    onChange={props.handleNumberChange}
                    min='0'
                    max={`${props.candidates.length-1}`}
                    disabled={props.remainingTime <= 0}
                    ></input>
           
            <button className="login-button" onClick={props.vote} disabled={props.remainingTime <= 0}>Vote</button>

                </div>
            )}
            
            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Connected;