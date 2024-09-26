import React from 'react';
import TeamCard from '../TeamCard/TeamCard';
import mockTeams from './mockTeams.json'; 
import styles from './CardWrapper.module.css';

function CardWrapper() {
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
                />
            ))}
        </div>
    );
}

export default CardWrapper;
