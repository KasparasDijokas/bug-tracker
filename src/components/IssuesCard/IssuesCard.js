import React from 'react';
import styles from './issuesCard.module.css';

const IssuesCard = (props) => {
    return (
        <div className={styles.issues__card} draggable>
        <h3 className={styles.issues__card__header}>{props.header}</h3>
        <div className={styles.empty}>{props.children}</div>
      </div>
    )
}

export default IssuesCard
