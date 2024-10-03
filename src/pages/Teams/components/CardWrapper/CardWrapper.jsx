import React, { useState, useEffect } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import axios from 'axios';
import styles from './CardWrapper.module.css'; 

function CardWrapper({ radioValue, refreshTeams, onTeamsChange }) {
    const [teams, setTeams] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setExpandedCard(null);

        let url;
        if (radioValue === 'showAll') {
            url = 'http://localhost:8081/team/getAll';
        } else if (radioValue === 'myTeams') {
            url = 'http://localhost:8081/team/getMyTeams/5';
        } else {
            url = 'http://localhost:8081/team/getAll';
        }

        axios.get(url)
            .then(response => {
                setTeams(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching teams:', error);
                setError('Failed to fetch teams.');
                setLoading(false);
            });
    }, [radioValue, refreshTeams]);

    const handleExpand = (cardId) => {
        setExpandedCard(expandedCard === cardId ? null : cardId);
    };

    const handleJoinTeam = (teamId) => {
        axios.post(`http://localhost:8081/team/${teamId}/addMember/5`)
            .then(response => {
                console.log('Successfully joined the team:', response.data);
                // Trigger a refresh of teams
                onTeamsChange();
            })
            .catch(error => {
                console.error('Error joining team:', error);
                alert('Failed to join team. Please try again.');
            });
    };

    if (loading) {
        return <div>Loading teams...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.cardContainer}>
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    teamName={team.name}
                    date={team.dateCreated}
                    imageUrl={team.imageURL}
                    teamDescription={team.description}
                    teamMembers={team.members || []}
                    isExpanded={expandedCard === team.id}
                    onExpandClick={() => handleExpand(team.id)}
                    onJoinTeam={() => handleJoinTeam(team.id)}
                />
            ))}
        </div>
    );
}

export default CardWrapper;
