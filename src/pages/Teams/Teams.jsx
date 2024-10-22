// Main component for the Teams page. It manages the overall state and renders child components like the search bar, 
// radio buttons for filtering, create team button, and the list of team cards.

import React, { useState } from 'react';
import styles from './Teams.module.css';
import Typography from "@mui/material/Typography";
import RadioButtons from "./components/RadioButtons/RadioButtons";
import TeamsSearch from './components/TeamsSearch/TeamsSearch';
import CreateTeam from './components/CreateTeam/CreateTeam';
import CardWrapper from "./components/CardWrapper/CardWrapper";
import { Box } from '@mui/material';

function Teams() {
    const [searchTerm, setSearchTerm] = useState('');
    const [radioValue, setRadioValue] = useState('showAll');
    const [refreshTeams, setRefreshTeams] = useState(0);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };

    const handleTeamCreated = () => {
        // Increment to trigger teams list refresh
        setRefreshTeams(prev => prev + 1);
    };

    const handleTeamsChange = () => {
        setRefreshTeams(prev => prev + 1);
    };

    return (
        <div>
            <div className={styles.container}>
                <Typography className={styles.title} variant="h3">Teams</Typography>
            </div>
            <div className={styles.controlBar}>
                <Box sx={{width: '150px'}} />
                {/* <TeamsSearch onSearch={handleSearch} /> */}
                <RadioButtons value={radioValue} onChange={handleRadioChange} />
                <CreateTeam onTeamCreated={handleTeamCreated} />
            </div>
            <div>
                <CardWrapper
                    radioValue={radioValue}
                    refreshTeams={refreshTeams}
                    onTeamsChange={handleTeamsChange}
                />
            </div>
        </div>
    );
}

export default Teams;
