import React from 'react';
import styles from './styles.scss';
import {BlockCheck, BlockCheckPrice} from "../utils/blockCheck";
import {place, tariffs} from "../../constans";
import {ButtonBlue, ButtonWhite} from "../utils/buttons";
import withRouter from "react-router/es/withRouter";
import {connect} from "react-redux";
import {changePhone, changePlace, changeTariff, changeVerify} from "../../actions";
import $ from "jquery";
import circle from "../../assets/media/check-large.svg";


export class AlertUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "+7 ",
            code: "",
            codeSend: null,


            isInvalidCode: false,
            isSendSMS: false,
            isVerify: false,
            isValidPhone: true,

            isShowSuccess: false,
        };
    };

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));

        this.changePlaceClick("");
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }

    onKeyPressed(e) {
        if (e.keyCode === 27) {
            this.props.closeAlert();
        }
    }


    componentDidMount() {
        this.setState({
            isVerify: this.props.data.isVerify,
            phone: this.props.data.phone.length > 0 ? this.props.data.phone : "+7 ",
        })
    }


    sendSMS = () => {
        let reg = new RegExp(/^(\+7[ ]9[0-9]{9})$/);


        if (reg.test(this.state.phone)) {
            this.setState({isSendSMS: true, isValidPhone: true, isInvalidCode: false});


            let code = (Math.random() * (10000 - 1000) + 1000).toFixed();
            console.log(code);
            this.setState({codeSend: code});
            fetch("https://smsc.ru/sys/send.php?login=vk_546389&psw=615243&phones=" + this.state.phone + "&mes=" + code,
                {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        "cache-control": "no-cache",
                        "Accept": 'application/json',
                        'Access-Control-Allow-Origin': '',
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => console.log(res)).catch(err => console.log(err));
        } else {
            this.setState({
                isValidPhone: false,
            })
        }


    };
    checkSMS = () => {
        if (this.state.code === this.state.codeSend) {
            this.setState({
                isVerify: true
            });
            this.props.dispatchChangePhone(this.state.phone);
            this.props.dispatchChangeStatus(true);
        } else {
            this.setState({isInvalidCode: true});
        }
    };

    sendAgain = () => {
        console.log("Send again");
        this.sendSMS();
    };

    changeTariffClick = (tariff) => {
        this.props.dispatchChangeTariff(tariff);
    };
    changePlaceClick = (place) => {
        this.props.dispatchChangePlace(place);
    };


    inputPhone = (e) => {
        let code = e.keyCode;

        if ((code < 48 || code > 58)) {
            if (code === 8 || code === 37 || code === 39) {
                if (this.state.phone.length === 3) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                return;
            } else {
                e.preventDefault();
                e.stopPropagation();
            }

        }
    };


    recording = () => {
        if (this.state.isVerify && this.props.data.tariff !== "" && this.props.data.place !== "") {
            $.ajax({
                type: "POST",
                url: "https://script.google.com/macros/s/AKfycbyB_JT618VA19HWLNBVhVClkPkezQnoDAh2fq6D/exec",
                data: "tariff=" + this.props.data.tariff + "&place=" + this.props.data.place + "&phone=" + this.state.phone,
                success: function (data) {
                    this.setState({isShowSuccess: true});
                }.bind(this)
            });
        }
    };

    render() {
        const data = this.props.data;

        if (this.state.isShowSuccess) {
            return <div className={styles.alert} onScroll={e => e.preventDefault()} onClick={() => this.props.closeAlert()}>
                <div className={styles.alertFormSuccess} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.content}>
                    <div className={styles.headerSuccess}>
                        <div onClick={() => this.props.closeAlert()} className={styles.closeImg}/>
                    </div>
                    <div className={styles.titleBold}>
                        Заявка принята
                    </div>
                    <img src={circle} alt={"circle"} className={styles.circleImg}/>
                    <div className={styles.text}>
                        Оператор свяжется с вами
                    </div>
                    </div>
                </div>
            </div>
        } else {
            return <div className={styles.alert} onScroll={e => e.preventDefault()} >
                <div className={styles.alertForm}>
                    <div className={styles.contentForm}>
                        <div className={styles.form}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Запись на сеанс
                            </div>
                            <div className={styles.linePurple}/>
                            <div onClick={() => this.props.closeAlert()} className={styles.closeImg}/>

                        </div>
                        <div className={styles.titleSmall}>
                            Вариант терапии
                        </div>
                        <div className={styles.blocks}>
                            <BlockCheckPrice title={"Разовый «Обнуляй»"}
                                             price={"2 600"}
                                             onClick={this.changeTariffClick}
                                             tariff={tariffs.ONCE}
                                             isCheck={data.tariff === tariffs.ONCE}/>
                            <BlockCheckPrice title={"Недельный «Обнуляй»"}
                                             price={"4 700"}
                                             onClick={this.changeTariffClick}
                                             tariff={tariffs.WEEKLY}
                                             isCheck={data.tariff === tariffs.WEEKLY}/>
                            <BlockCheckPrice title={"Системный «Обнуляй»"}
                                             price={"18 200"}
                                             onClick={this.changeTariffClick}
                                             tariff={tariffs.SYSTEMIC}
                                             isCheck={data.tariff === tariffs.SYSTEMIC}/>
                        </div>
                        <div className={styles.titleSmall}>
                            Место сеанса
                        </div>
                        <div className={styles.blocks}>
                            <BlockCheck title={"У нас"}
                                        text={"Метро Алексеевская,\n улица Бочкова дом 5"}
                                        place={place.CENTER}
                                        onClick={this.changePlaceClick}
                                        isCheck={data.place === place.CENTER}/>
                            <BlockCheck title={"На дому"}
                                        text={"Оператор свяжется с вами для уточнения адреса"}
                                        place={place.HOME}
                                        onClick={this.changePlaceClick}
                                        isCheck={data.place === place.HOME}/>
                        </div>
                        <div className={styles.titleSmall}>
                            Номер телефона
                        </div>
                        <div className={styles.line}>
                            <input value={this.state.phone}
                                   onFocus={() => this.setState({
                                       phone: this.state.phone === "" ? "+7 " : this.state.phone,
                                       isValidPhone: true
                                   })}
                                   onBlur={() => this.setState({phone: this.state.phone === "+7 " ? "" : this.state.phone})}
                                   className={this.state.isSendSMS ? styles.inputPhoneDisable : styles.inputPhone}
                                   readOnly={this.state.isSendSMS || this.state.isVerify}
                                   onChange={(e) => this.setState({phone: e.target.value})}
                                   onKeyDown={(e) => this.inputPhone(e)}
                                   maxLength={13}
                                   placeholder={"+7 XXX XXX-XX-XX"}/>
                            {!this.state.isSendSMS && !this.state.isValidPhone &&
                            <MessageInvalid text={"Недопустимый формат номера"}/>}
                            {this.state.isVerify && <MessageValid text={"Номер подтвержден"}/>}
                        </div>
                        {!this.state.isSendSMS && !this.state.isVerify &&
                        <ButtonWhite text={"Подтвердить номер"} width={352}
                                     onClick={this.sendSMS}/>}


                        {this.state.isSendSMS && !this.state.isVerify &&
                        <div>
                            <div className={styles.textSmall} onClick={() => this.setState({isSendSMS: false})}>
                                Изменить номер
                            </div>
                            <div className={styles.titleSmall}>
                                Код подтверждения из СМС
                            </div>

                            <div className={styles.line}>
                                <input value={this.state.code}
                                       className={styles.inputPhone}
                                       onFocus={() => this.setState({isInvalidCode: false})}
                                       onChange={(e) => this.setState({code: e.target.value})}
                                       placeholder={"XXXX"}
                                       maxLength={4}/>
                                {this.state.isInvalidCode && <MessageInvalid text={"Неверный код"}/>}
                            </div>
                            <div className={styles.textSmall} onClick={() => this.sendAgain()}>
                                Отправить код ещё раз
                            </div>
                            <ButtonWhite text={"Подтвердить номер"} width={352}
                                         onClick={this.checkSMS}/>
                        </div>}

                        <div className={styles.footer}>
                            <div className={styles.linePurpleFooter}/>
                            <div className={styles.container}>
                                <ButtonBlue
                                    disable={!this.state.isVerify || this.props.data.tariff === "" || this.props.data.place === ""}
                                    onClick={this.recording} text={"Записаться"}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
}


export const Alert = withRouter(connect(
    store => ({
        data: store.data,
    }),
    dispatch => ({
        dispatchChangeTariff(tariff) {
            dispatch(changeTariff(tariff))
        },
        dispatchChangePlace(place) {
            dispatch(changePlace(place))
        },
        dispatchChangePhone(phone) {
            dispatch(changePhone(phone))
        },
        dispatchChangeStatus(status) {
            dispatch(changeVerify(status))
        }
    })
)(AlertUI));

export const MessageInvalid = ({text}) => (
    <div className={styles.messageInvalidShadow}>
        <div className={styles.messageInvalid}>
            {text}
            <div className={styles.triangle}/>
        </div>

    </div>
);

export const MessageValid = ({text}) => (
    <div className={styles.messageValidShadow}>
        <div className={styles.messageValid}>
            {text}
            <div className={styles.triangleValid}/>
        </div>

    </div>
);