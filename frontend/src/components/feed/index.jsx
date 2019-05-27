import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from './style.scss';
import logo_text from '../../assets/media/logo_text.svg';

import background from '../../assets/media/bubbles.png';
import {ButtonBlue, ButtonCircleLeft, ButtonCircleRight, ButtonPhone, ButtonPurple, ButtonRose} from "../utils/buttons";
import {Separator, SeparatorBig} from "../utils/separator";

import withRouter from "react-router/es/withRouter";

import {FullscreenControl, GeoObject, Map, ZoomControl} from 'react-yandex-maps';
import classnames from 'classnames';
import people_1 from '../../assets/media/avatar-1.jpg';
import people_2 from '../../assets/media/avatar-2.jpg';
import people_3 from '../../assets/media/avatar-3.jpg';

import bubble_1 from '../../assets/media/bubble-1.png';
import bubble_2 from '../../assets/media/bubble-2.png';
import bubble_3 from '../../assets/media/bubble-3.png';
import bubble_4 from '../../assets/media/bubble-4.png';

import img_1 from '../../assets/media/eye.svg';
import img_2 from '../../assets/media/leaf.svg';
import img_3 from '../../assets/media/muscle.svg';

import slide_1 from '../../assets/media/bottle-chocolate.png';
import slide_2 from '../../assets/media/bottle-green.png';
import slide_3 from '../../assets/media/bottle-orange.png';
import slide_4 from '../../assets/media/bottle-red.png';
import slide_5 from '../../assets/media/bottle-yellow.png';
import {changePlace, changeTariff} from "../../actions";
import {tariffs} from "../../constans";
import {Alert} from "../popup";

class FeedUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider_max_slide: 5,

            isOpenPopup:  false,
            slider_description: {
                0: "Бодрящий утренний смузи с органическим какао, миндальным молоком и бананом",
                1: "Витаминный смузи из киви, миндального молока и огурца.",
                2: "Энергетический смузи из папайи, манго и апельсина с семенами льна",
                3: "Смузи \"а-ля гаспаччо\" из спелых томатов, сладкого перца и авокадо",
                4: "Восстанавливающий и питательный смузи из клубники, гуавы и лайма",
            },

            bubble_1_top: 0.4,
            bubble_2_top: 0.6,
            bubble_3_top: 0.1,
            bubble_4_top: 0.8,

            scrollTop: 0,
        };

    };

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {

        document.addEventListener("scroll", function(e){
            }, true);
        this.setState({
            images: [slide_1, slide_2,   slide_3, slide_4, slide_5],
            imageID: 0,
        })


    }


    componentDidMount() {
        document.addEventListener("scroll", this.scrollPage);
    }


    scrollPage = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        this.setState({
            scrollTop: scrollTop,
        });
    };

    componentWillUnmount() {
        document.removeEventListener("scroll", this.scrollPage);
    }

    toLeft = () => this.setState({
        imageID: this.state.imageID === 0 ? 4 : this.state.imageID - 1,
    });
    toRight = () => this.setState({
        imageID: this.state.imageID === 4 ? 0 : this.state.imageID + 1,
    });

    changeTariffClick = (tariff) => {
        this.props.dispatchChangeTariff(tariff);
        this.openAlert();
    };


    closeAlert = () => {
        document.body.style.overflow = 'auto';
        this.setState({isOpenPopup: false});
    };
    openAlert = () => {
        document.body.style.overflow = 'hidden';
        this.setState({isOpenPopup: true})
    };


    render() {
        return (
            <div className={styles.fullPageBack}>
                <img src={background} alt={"background"} className={styles.backgroundImg}/>
                <img src={bubble_1} alt={"background"} className={styles.bubble_1} />
                <img src={bubble_2} alt={"background"} className={styles.bubble_2} />
                <img src={bubble_3} alt={"background"} className={styles.bubble_3} />
                <img src={bubble_4} alt={"background"} className={styles.bubble_4} />
                <div className={styles.backgroundBlock}/>
                <div className={styles.backgroundBlockGradient}/>
                <div className={styles.backgroundBlockGradientBottom}/>
                <div className={styles.fullPageContent}>
                    <div className={styles.fullPage}>
                        <div className={styles.lineButtons}>
                            <ButtonPhone text={"+7 929 692-82-49"}/>
                            <ButtonRose text={"Записаться"}
                                        onClick={this.changeTariffClick}
                                        tariff={""}/>
                        </div>

                        <div className={styles.title}>Массажный бар</div>
                        <div className={styles.logo} >
                            <div className={styles.logoImg}/>
                            <img src={logo_text} alt={"logo_text"} className={styles.logoImgTxt}/>
                        </div>


                        <div className={styles.title}>Синергия массажа и детокс-терапии</div>

                        <div className={styles.info}>
                            <div className={styles.separatorPurple}/>
                            {"Мы верим, что эффект очищения и восстановления \n тела достигается только комплексным путём, поэтому \n каждый наш массаж дополняется детокс-напитком."}
                            <div className={styles.separatorPurple}/>
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.blockBig}>
                                <div className={styles.blockBigTitle}>
                                    Массаж
                                </div>
                                <div className={styles.blockBigLine}>
                                    <div className={styles.blockBigLineText}>
                                        <div className={styles.blockBigLineTitle}>
                                            Релакс
                                        </div>
                                        Комплексное оздоровление и
                                        повышение работоспособности
                                    </div>
                                    <img src={img_1} alt={"img_1"} className={styles.blockBigLineImg}/>
                                </div>
                                <div className={styles.blockBigLine}>
                                    <div className={styles.blockBigLineText}>
                                        <div className={styles.blockBigLineTitle}>
                                            Антицел
                                        </div>
                                        Массаж для тех, кто заботится о своей фигуре, улучшает кожу
                                    </div>
                                    <img src={img_2} alt={"img_2"} className={styles.blockBigLineImg_2}/>
                                </div>
                                <div className={styles.blockBigLine}>
                                    <div className={styles.blockBigLineText}>
                                        <div className={styles.blockBigLineTitle}>
                                            Спорт
                                        </div>
                                        Восстановление мышц после
                                        физических нагрузок и тренировок
                                    </div>
                                    <img src={img_3} alt={"img_3"} className={styles.blockBigLineImg_3}/>
                                </div>

                            </div>
                            <div className={styles.blockBig}>
                                <div className={styles.blockBigTitle}>
                                    Детокс-бар
                                </div>


                                <div className={styles.sliderBar}>
                                    <ButtonCircleLeft toLeft={this.toLeft}/>
                                    <div className={styles.slide}>
                                        <div className={styles.slides} style={{left: 0}}>
                                            <img src={this.state.images[this.state.imageID]} alt={"slide"}
                                                 className={styles.slideImg}/>
                                        </div>
                                    </div>
                                    <ButtonCircleRight toRight={this.toRight}/>
                                </div>
                                <div className={styles.blockBigLineTitle}>
                                    Обнуляй №{this.state.imageID + 1}
                                </div>
                                <div className={styles.textSlider}>
                                    {this.state.slider_description[this.state.imageID]}
                                </div>
                            </div>
                        </div>


                        <Separator text={"Цены"}/>
                        <div className={styles.contentRow}>
                            <div className={styles.blockMedium}>
                                <div className={styles.blockBigTitle}>
                                    Разовый «Обнуляй»
                                </div>
                                <div className={styles.priceSeparator}>
                                    <div className={styles.priceOval}>
                                        2 600 рублей
                                    </div>
                                    <div className={styles.priceSeparatorPurple}/>
                                </div>
                                <div className={styles.blockMediumText}>
                                    Сеанс массажа
                                </div>
                                <div className={styles.blockMediumText}>
                                    Любой напиток
                                </div>
                                <div className={styles.button}>
                                    <ButtonRose text={"Записаться"}
                                                onClick={this.changeTariffClick}
                                                tariff={tariffs.ONCE}
                                                width={304}/>
                                </div>
                            </div>
                            <div className={styles.blockMedium}>
                                <div className={styles.blockBigTitle}>
                                    Недельный «Обнуляй»
                                </div>
                                <div className={styles.priceSeparator}>
                                    <div className={styles.priceOval}>
                                        4 700 рублей
                                    </div>
                                    <div className={styles.priceSeparatorPurple}/>
                                </div>
                                <div className={styles.blockMediumText}>
                                    2 сеанса массажа
                                </div>
                                <div className={styles.blockMediumText}>
                                    Напиток на каждый сеанс
                                </div>
                                <div className={styles.button}>
                                    <ButtonPurple text={"Записаться"}
                                                  onClick={this.changeTariffClick}
                                                  tariff={tariffs.WEEKLY}
                                                  width={304}/>
                                </div>
                            </div>
                            <div className={styles.blockMedium}>
                                <div className={styles.blockBigTitle}>
                                    Системный «Обнуляй»
                                </div>
                                <div className={styles.priceSeparator}>
                                    <div className={styles.priceOval}>
                                        18 200 рублей
                                    </div>
                                    <div className={styles.priceSeparatorPurple}/>
                                </div>
                                <div className={styles.blockMediumText}>
                                    8 сеансов массажа
                                </div>
                                <div className={styles.blockMediumText}>
                                    Напиток на каждый сеанс
                                </div>
                                <div className={styles.blockMediumText}>
                                    {"Индивидуальная\n детокс-программа"}
                                </div>
                                <div className={styles.button}>
                                    <ButtonBlue text={"Записаться"}
                                                onClick={this.changeTariffClick}
                                                tariff={tariffs.SYSTEMIC}
                                                width={304}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.titleSmall}>
                            Опции
                        </div>
                        <div className={styles.contentRow}>
                            <div className={styles.blockSmall}>
                                <div className={styles.text} style={{marginBottom: "16px"}}>
                                    15 минут к сеансу
                                </div>
                                <div className={styles.price}>
                                    500 рублей
                                </div>
                            </div>
                            <div className={styles.blockSmall}>
                                <div className={styles.text} style={{marginBottom: "16px"}}>
                                    Обёртывание
                                </div>
                                <div className={styles.price}>
                                    1500 рублей
                                </div>
                            </div>
                            <div className={styles.blockSmall}>
                                <div className={styles.text} style={{marginBottom: "8px"}}>
                                    Детокс-набор
                                </div>
                                <div className={styles.greyText} style={{marginBottom: "16px"}}>
                                    8 напитков
                                </div>
                                <div className={styles.price}>
                                    2300 рублей
                                </div>
                            </div>
                        </div>
                        <Separator text={"Массаж-баристы"}/>
                        <div className={styles.contentRow}>
                            <div className={styles.blockPeople}>
                                <div className={classnames(styles.peoplePhoto, styles.borderRose)}>
                                    <img src={people_1} alt={"people"} className={styles.peopleImg}/>
                                </div>
                                <div className={styles.peopleName}>
                                    Анастасия
                                </div>
                                <div className={styles.peopleText}>
                                    Профессионал с большой буквы. Ни одного недовольного клиента на нашей памяти не было.
                                </div>
                            </div>
                            <div className={styles.blockPeople}>
                                <div className={classnames(styles.peoplePhoto, styles.borderPurple)}>
                                    <img src={people_2} alt={"people"} className={styles.peopleImg}/>
                                </div>
                                <div className={styles.peopleName}>
                                    Андрей
                                </div>
                                <div className={styles.peopleText}>
                                    Перфекционист, который не отпустит клиента, не убедившись, что его тело в идеальном
                                    состоянии.
                                </div>
                            </div>
                            <div className={styles.blockPeople}>
                                <div className={classnames(styles.peoplePhoto, styles.borderBlue)}>
                                    <img src={people_3} alt={"people"} className={styles.peopleImg}/>
                                </div>
                                <div className={styles.peopleName}>
                                    Роман
                                </div>
                                <div className={styles.peopleText}>
                                    Просто скажите, как сделать массаж, и он сделает всё в лучших традициях «Обнуляй».
                                </div>
                            </div>
                        </div>
                        <Separator text={"Массаж-бар"}/>
                        <div className={styles.photo}>
                            <div className={styles.leftPhoto}>
                                <div className={styles.photo_1}/>
                                <div className={styles.bottomLine}>
                                    <div className={styles.photo_2}/>
                                    <div className={styles.photo_3}/>
                                </div>
                            </div>
                            <div className={styles.rightPhoto}>
                                <div className={styles.map}>
                                    <Map defaultState={{center: [55.81, 37.63], zoom: 13}}
                                         width={500}
                                         height={526}>
                                        <GeoObject
                                            geometry={{
                                                type: 'Point',
                                                coordinates: [55.810201, 37.632737],
                                            }}
                                        />
                                        <FullscreenControl/>
                                        <ZoomControl
                                            options={{
                                                size: 'small',
                                                zoomDuration: 1100,
                                            }}
                                        />
                                    </Map>
                                </div>
                                <div className={styles.address}>
                                    Метро Алексеевская,<br/>улица Бочкова дом 5
                                </div>
                                <ButtonPhone text={"+7 929 692-82-49"}/>

                            </div>
                        </div>
                        <SeparatorBig text={"Обнуляем усталость"}/>
                    </div>
                </div>
                {this.state.isOpenPopup && <Alert closeAlert={this.closeAlert}/>}
            </div>
        );
    }
}


export const Feed = withRouter(connect(
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
    })
)(FeedUI));