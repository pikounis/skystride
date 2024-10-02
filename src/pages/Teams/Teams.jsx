import React, { useState } from 'react';
import styles from './Teams.module.css';
import Typography from "@mui/material/Typography";
import RadioButtons from "./components/RadioButtons/RadioButtons";
import TeamsSearch from './components/TeamsSearch/TeamsSearch';
import CreateTeam from './components/CreateTeam/CreateTeam';
import CardWrapper from "./components/CardWrapper/CardWrapper";

function Teams() {
    const [searchTerm, setSearchTerm] = useState('');
    const [radioValue, setRadioValue] = useState('showAll');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    return (
        <div>
            <div className={styles.container}>
                <Typography className={styles.title} variant="h3">Teams</Typography>
            </div>
            <div className={styles.controlBar}>
                <TeamsSearch onSearch={handleSearch} />
                <RadioButtons value={radioValue} onChange={handleRadioChange} />
                <CreateTeam />
            </div>
            <div>
                <CardWrapper radioValue={radioValue} />
            </div>
        </div>
    );
}

export default Teams;
