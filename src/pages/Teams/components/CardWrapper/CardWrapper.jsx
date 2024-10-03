import React, { useState, useEffect } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import axios from 'axios';
import styles from './CardWrapper.module.css'; 

function CardWrapper({ radioValue, refreshTeams, onTeamsChange }) {
    const [teams, setTeams] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = 5; // Replace with actual user ID in real application

    useEffect(() => {
        setLoading(true);
        setError(null);
        setExpandedCard(null);

        let url;
        if (radioValue === 'showAll') {
            url = 'http://localhost:8081/team/getAll';
        } else if (radioValue === 'myTeams') {
            url = `http://localhost:8081/team/getMyTeams/${userId}`;
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
        axios.post(`http://localhost:8081/team/${teamId}/addMember/${userId}`)
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

    const handleLeaveTeam = (teamId) => {
        axios.post(`http://localhost:8081/team/${teamId}/removeMember/${userId}`)
            .then(response => {
                console.log('Successfully left the team:', response.data);
                // Trigger a refresh of teams
                onTeamsChange();
            })
            .catch(error => {
                console.error('Error leaving team:', error);
                alert('Failed to leave team. Please try again.');
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
            {teams.map((team) => {
                const isMember = team.members && team.members.some(member => member.id === userId);
                return (
                    <TeamCard
                        key={team.id}
                        teamId={team.id}
                        teamName={team.name}
                        date={team.dateCreated}
                        imageUrl={team.imageURL}
                        teamDescription={team.description}
                        teamMembers={team.members || []}
                        isMember={isMember}
                        isExpanded={expandedCard === team.id}
                        onExpandClick={() => handleExpand(team.id)}
                        onJoinTeam={() => handleJoinTeam(team.id)}
                        onLeaveTeam={() => handleLeaveTeam(team.id)}
                    />
                );
            })}
        </div>
    );
}

export default CardWrapper;
