import React, { useState } from "react";

const HookUseState = () => {
    const [counter, setCounter] = useState(0);
    const [mood, setMood] = useState("relaxed")
    const [showMood,setShowMood] = useState(true)
    const handleOnClick = () => {
        setCounter(counter + 1)
    }
    const handleOnChange =({target}) => {
        console.log(target.name, target.value)
        setMood(target.value)
    }
    return (<div className="text-center container border border-danger">
       <h4>useState</h4>
        <label>Enter Mood Swing</label>
        <select value={mood} name="mood" onChange={handleOnChange}>
            <option value='happy'>Happy</option>
            <option value='sad'>Sad</option>
            <option value='stressed'>Stressed</option>
            <option default value='relaxed'>Relaxed</option>
        </select>
        <button onClick={(event)=>setShowMood(!showMood)}>Show Mood </button>
        {/* {mood} */}
        {showMood && <div> <h1>Today is a {mood} day</h1> <p>useState is a Hook. We call it inside a function component to add some local state to it. React will preserve this state between re-renders. useState returns a pair: the current state value and a function that lets you update it. You can call this function from an event handler or somewhere else. It’s similar to this.setState in a class, except it doesn’t merge the old and new state together.</p> </div>}
        <h1>Counter: <span>{counter}</span></h1>
        <button onClick={handleOnClick}>Start Counter</button>
    </div>)
}

export default HookUseState;
