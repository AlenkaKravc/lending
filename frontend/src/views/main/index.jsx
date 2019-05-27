import React from 'react';
import {Feed} from "../../components/feed"

import styles from './style.scss';

export const MainPage = () => (
    <div className={styles.mainPage}>
        <Feed/>
    </div>
);
