import React from 'react';
import {Route, Router} from 'react-router-dom'
import App from './App';
import Goal from './components/pages/goal/goal';
import Items from './components/pages/item/item';
import Home from './components/pages/landing/home'
import Callback from './components/callback/Callback';
import Auth from './Auth/Auth';
import history from './history/history';
import Nav from './components/Nav/Nav';
import GoalItem from './components/goal-item/GoalItem';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication()
    }
}

export const makeMainRoutes = () => {

    return (
        <div>
        <Router history={history} component={App}>
            <div>
                <Route path="/" render={(props) => <Nav auth={auth} {...props} />} />
                <Route exact path='/' render={(props) => <Home auth={auth} {...props} />} />
                <Route path="/goals" render={(props) => <Goal auth={auth} {...props} />} />
                <Route path="/items" render ={(props) => <Items auth={auth} {...props} />} />
                <Route path="/goalItems" render={(props) => <GoalItem auth={auth} {...props}/>} />
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </div>
        </Router>
        </div>
    );
};
