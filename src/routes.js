import React from 'react'
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/index';
import SingIn from './Components/SignIn/index'; 
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';



const Routes = (props) => {

    return (
        <Layout>
            <Switch>
            <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
              <PublicRoutes {...props} restricted={false} path="/" exact  component = {Home}  />
              <PublicRoutes {...props} restricted={true} path="/sing_In" exact  component = {SingIn}  />

                


            </Switch>
        </Layout>
    )
}
export default Routes;
