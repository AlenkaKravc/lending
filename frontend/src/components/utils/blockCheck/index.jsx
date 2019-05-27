import React from "react";

import styles from './styles.scss';

import check from '../../../assets/media/check.svg';
import ellipse from '../../../assets/media/ellipse.svg';

export const BlockCheck = ({title, text, isCheck = false, onClick, place}) => (
    <div className={isCheck ? styles.blockCheck : styles.block} onClick={() => onClick(place)}>
        <div className={styles.check} onClick={() => onClick(place)}>
            <img src={isCheck ? check : ellipse} alt={"check"} className={styles.checkImg}/>
        </div>
        <div className={styles.text}>
            <div className={styles.title}>
                {title}
            </div>
            {text}
        </div>

    </div>
);

export const BlockCheckPrice = ({title, price, isCheck = false, onClick, tariff}) => (
    <div className={isCheck ? styles.blockCheck : styles.block}
         onClick={() => onClick(tariff)}>
        <div className={styles.check}>
            <img src={isCheck ? check : ellipse} alt={"check"} className={styles.checkImg}/>
        </div>
        <div className={styles.textPrice}>
            <div className={styles.title}>
                {title}
            </div>
            <div>
            {price} рублей
            </div>
        </div>
    </div>
);