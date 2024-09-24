import React, { useState } from 'react';
import styles from './Teams.module.css';
import Typography from "@mui/material/Typography";
import RadioButtons from "./components/RadioButtons/RadioButtons";
import TeamsSearch from './components/TeamsSearch/TeamsSearch';
import CreateTeam from './components/CreateTeam/CreateTeam';
import TeamCard from "./components/TeamCard/TeamCard";

function Teams() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleButtonClick = () => {
        console.log('Button clicked!');
    };

    return (
        <div>
            <div className={styles.container}>
                <Typography className={styles.title} variant="h3">Teams</Typography>
            </div>
            <div className={styles.controlBar}>
                <TeamsSearch onSearch={handleSearch} />
                <RadioButtons />
                <CreateTeam onClick={handleButtonClick} />
            </div>
            <div>
                <TeamCard/>
            </div>
        </div>
    );
}

export default Teams;
