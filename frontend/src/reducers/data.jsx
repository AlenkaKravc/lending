import C from '../constans';


export const data = (state = {}, action) => {
    switch (action.type) {
        case C.CHANGE_TARIFF:
            return {...state, tariff: action.tariff};
        case C.CHANGE_PLACE:
            return {...state, place: action.place};
        case C.CHANGE_PHONE:
            return {...state, phone: action.phone};
        case C.CHANGE_VERIFY:
            return {...state, isVerify: action.isVerify};
        default:
            return state;
    }
};