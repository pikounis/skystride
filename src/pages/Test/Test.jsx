// pages/Test.js
import React, { useEffect, useState } from 'react';

function Test() {
    const [testState, setTestState] = useState("None");
    async function runGet() {
        const response = await fetch(`http://localhost:8081/user/getAll`);
        const json = await response.json();
        setTestState(json);
        console.log(json);
    }

    useEffect(() => {
        runGet();
    }, [])
    return (
        <div className='container'>
            <h1>Welcome to the Test Page</h1>
        </div>
    );
}

export default Test;