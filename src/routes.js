import React from 'react'
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/index';
import SingIn from './Components/SignIn/index'; 
import Dashboard from './Components/Admin/Dashboard';

const Routes = (props) => {
    return (
        <Layout>
            <Switch>
                <Route exact component = {Home} path ="/"/>
                <Route exact component = {SingIn} path ="/sing_In"/>
                <Route exact component = {Dashboard} path ="/dashboard"/>


            </Switch>
        </Layout>
    )
}
export default Routes;
