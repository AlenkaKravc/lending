import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './routers';
import {storeFactory} from './reducers';

import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import { YMaps } from 'react-yandex-maps';
import {tariffs, place} from '../src/constans/index';

const initialState = {
    data: {
        tariff: tariffs.ONCE,
        place: place.CENTER,
        phone: "",
        isVerify: false,
    },

};

const store = storeFactory(initialState);

const render = () =>
    ReactDOM.render(
        <Provider store={store}>
            <YMaps>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
            </YMaps>
        </Provider>,
        document.getElementById('root'));

store.subscribe(render);
render();

//registerServiceWorker();
