import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {MainPage} from "../views/main";


const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={MainPage}/>
    </Switch>
);


export default withRouter(MainRouter);
