// pages/Test.js
import React, { useEffect, useState } from 'react';

function HealthPage() {
    async function runGet() {
        const response = await fetch(`http://35.176.106.162:8081/user/getAll`);
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

export default HealthPage;