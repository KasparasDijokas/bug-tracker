import React from 'react';
import styles from './dragndrop.module.css';

const DragNDrop = () => {
    return (
        <div className={styles.container}>
            <div className={styles.empty} draggable></div>
            <div className={styles.empty}></div>
            <div className={styles.empty}></div>
            <div className={styles.empty}></div>
            <div className={styles.empty}></div>
            <div className={styles.empty}></div>
        </div>
    )
}

export default DragNDrop;
