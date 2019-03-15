import React from 'react'
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home/index';
import SingIn from './Components/SignIn/index';
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';
import AdminMatches from './Components/Admin/matches/index';
import TheTeam from './Components/TheTeam'; 
import AddEditMatch from './Components/Admin/matches/addEditMatch';
import AdminPlayers from './Components/Admin/Players/index';
import AddEditPlayers from './Components/Admin/Players/addEditPlayers';
import TheMatches from './Components/TheMatches'; 
import NotFound from './Components/ui/not_found';


const Routes = (props) => {

    return (
        <Layout>
            <Switch>
                <PrivateRoute {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
                <PrivateRoute {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
                <PrivateRoute {...props} path="/admin_players" exact component={AdminPlayers} />
                <PrivateRoute {...props} path="/admin_matches/edit_match" exact component={AddEditMatch} />
                <PrivateRoute {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch} />
                <PrivateRoute {...props} path="/admin_matches" exact component={AdminMatches} />
                <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
                <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
                <PublicRoutes {...props} restricted={true} path="/sing_In" exact component={SingIn} />
                <PublicRoutes {...props} restricted={false} path="/the_team" exact component={TheTeam} />
                <PublicRoutes {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
                <PublicRoutes {...props} restricted={false}  exact component={NotFound} />

            </Switch>
        </Layout>
    )
}
export default Routes;
