import {createStore, combineReducers, applyMiddleware} from 'redux';

import {data} from './data';

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

const saver = store => next => action => {
    let result = next(action);
    localStorage['reset'] = JSON.stringify(store.getState());
    return result;
};

const initStorage = (initialState = {}) => {
    if (localStorage.getItem('reset') != null) {
        return JSON.parse(localStorage.getItem('reset'));
    } else {
        localStorage.setItem('reset', JSON.stringify(initialState));
        return initialState;
    }
};

export const storeFactory = (initialState = {}) => (
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({
            data,
        }), initStorage(initialState)
    )
);
