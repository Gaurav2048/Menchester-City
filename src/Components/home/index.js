import React from 'react';
import Featured from './featured/index';
import MatchesHome from './Matches';
import MeetPlayers from './MeetPlayers/index';
import Promotion from './promotion/index';

const Home = () => {
    return (
        <div className="bck_blue" >
            <Featured />
            <MatchesHome />
            <MeetPlayers />
            <Promotion/>
        </div>
    );
};

export default Home;