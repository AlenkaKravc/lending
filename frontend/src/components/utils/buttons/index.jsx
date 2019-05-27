import React from "react";

import styles from './styles.scss';
import classnames from "classnames";
import {isMobile} from "react-device-detect";

export const ButtonWhite = ({text, width = "", onClick = function () {}}) => (
    <div className={classnames(styles.button, styles.buttonWhite)} style={{width: width}} onClick={() => onClick()}>
        {text}
    </div>
);

export const ButtonPhone = ({text, width = ""}) => (
        isMobile ? <a href={"tel:".concat("+7 (929) 6928249")} className={classnames(styles.button, styles.buttonPhone)} style={{width: width}}> {text} </a> :
            <div className={classnames(styles.button, styles.buttonPhone)} style={{width: width}}>{text}</div>
);


export const ButtonRose = ({text, width = "240px", tariff, onClick = function () {}}) => (
    <div className={classnames(styles.button, styles.buttonRose)}
         style={{width: width}}
         onClick={() => onClick(tariff)}>
        {text}
        <div className={classnames(styles.shadow, styles.shadowRose)}/>
    </div>
);

export const ButtonBlue = ({text, width = "240px", disable = false, tariff, onClick = function () {}}) => (
    <div className={classnames(styles.button, disable ? styles.buttonBlueDisable : styles.buttonBlue)}
         style={{width: width}}
         onClick={() => onClick(tariff)}>
        {text}
        {!disable && <div className={classnames(styles.shadow, styles.shadowBlue)}/>}
    </div>
);

export const ButtonPurple = ({text, width = "240px", tariff, onClick = function () {}}) => (
    <div className={classnames(styles.button, styles.buttonPurple)}
         style={{width: width}}
         onClick={() => onClick(tariff)}>
        {text}
        <div className={classnames(styles.shadow, styles.shadowPurple)}/>
    </div>
);

export const ButtonCircleRight = ({toRight}) => (
    <div className={styles.buttonCircleRight} onClick={() => toRight()}/>
);

export const ButtonCircleLeft = ({toLeft}) => (
    <div className={styles.buttonCircleLeft} onClick={() => toLeft()}/>
);