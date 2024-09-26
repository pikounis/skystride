import React from "react";
import Proptype from 'prop-types';
import styles from "./Badge.module.css";

const Badge = ({achievement})=>{
    return (
        <div>
        <img src={achievement} className={styles.badgeIcon} />
      </div>
    )
}

Badge.propType = {
    achievement: Proptype.string
}

export default Badge;