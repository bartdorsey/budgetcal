import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import useAuthRequired from '../hooks/useAuthRequired';

interface RoutesProps {}

function Routes({}: RoutesProps) {
    const { isLoading, isUninitialized } = useAuthRequired()

    if (isLoading || isUninitialized) {
      return null;
    }

    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/sign-up">
                <SignUp/>
            </Route>
        </Switch>
    )
}

export default Routes