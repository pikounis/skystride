// pages/Test.js
import React, { useEffect, useState } from 'react';

function TestPage() {
    async function runGet() {
        const response = await fetch(`http://localhost:8081/user/getAll`);
        const json = await response.json();
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

export default TestPage;