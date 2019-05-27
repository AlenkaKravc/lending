import C from '../constans';


export const changeTariff = (tariff) =>
    ({
        type: C.CHANGE_TARIFF,
        tariff: tariff,
    });

export const changePlace = (place) =>
    ({
        type: C.CHANGE_PLACE,
        place: place,
    });

export const changePhone = (phone) => (
    {
        type: C.CHANGE_PHONE,
        phone: phone,
    });

export const changeVerify = (status) => (
    {
        type: C.CHANGE_VERIFY,
        isVerify: status,
    });