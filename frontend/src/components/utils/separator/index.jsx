import React from "react";

import styles from './styles.scss';

export const Separator = ({text}) => (
    <div className={styles.separator}>
        <div className={styles.separatorRose}/>
        {text}
        <div className={styles.separatorRose}/>
    </div>
);

export const SeparatorBig = ({text}) => (
    <div className={styles.separatorBig}>
        <div className={styles.separatorPurple}/>
        {text}
        <div className={styles.separatorPurple}/>
    </div>
);