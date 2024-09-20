// pages/Home.js
import React from 'react';
import LineGraph from './Components/LineGraph/LineGraph';
import styles from './Home.module.css';

const mockDataName = "Jack";

const mockDataPoints = [
  {
    name: 'Mon 9th',
    pv: 90,
  },
  {
    name: 'Tue 10th',
    pv: 60,
  },
  {
    name: 'Wed 11th',
    pv: 70,
  },
  {
    name: 'Thu 12th',
    pv: 50,
  },
  {
    name: 'Fri 13th',
    pv: 40,
  }
];

const mockDataHoursWorkedOut = [
  {
    name: 'Mon 9th',
    pv: 10,
  },
  {
    name: 'Tue 10th',
    pv: 40,
  },
  {
    name: 'Wed 11th',
    pv: 70,
  },
  {
    name: 'Thu 12th',
    pv: 35,
  },
  {
    name: 'Fri 13th',
    pv: 40,
  }
];

function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello {mockDataName}!</h1>

      <h4>Points earned in the last 5 days</h4>
      <div className={styles.chartsSection}>
        <LineGraph data={mockDataPoints}/>
        
        <h4>Hours worked out in the last 5 days</h4>
        <div className={styles.hoursWorkedChart}>
          {/* Add filtering component here */}
          <LineGraph data={mockDataHoursWorkedOut} />
        </div>
        
      </div>
      
    </div>
  );
}

export default Home;
