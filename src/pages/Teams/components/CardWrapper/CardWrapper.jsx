import React, { useState } from 'react';
import TeamCard from '../TeamCard/TeamCard';
import mockTeams from './mockTeams.json'; 
import styles from './CardWrapper.module.css'; 

function CardWrapper() {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId); // Collapse if clicked again
  };

  return (
    <div className={styles.cardContainer}>
      {mockTeams.map((team) => (
        <TeamCard
          key={team.id}
          teamName={team.teamName}
          date={team.date}
          imageUrl={team.imageUrl}
          teamDescription={team.teamDescription}
          teamMembers={team.teamMembers}
          isExpanded={expandedCard === team.id} // Pass the expanded state
          onExpandClick={() => handleExpand(team.id)} // Pass the function to toggle expansion
        />
      ))}
    </div>
  );
}

export default CardWrapper;
