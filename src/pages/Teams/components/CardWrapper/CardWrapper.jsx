import React, { useState, useEffect } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import axios from 'axios';
import styles from './CardWrapper.module.css'; 

function CardWrapper({ radioValue }) {
  const [teams, setTeams] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setLoading(true);
    setError(null);
    setExpandedCard(null); // Reset expanded card when data changes

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
  }, [radioValue]);

  const handleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
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
        />
      ))}
    </div>
  );
}

export default CardWrapper;
