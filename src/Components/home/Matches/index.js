import React from 'react';
import { Tag } from '../../ui/misc';
import { teal } from '@material-ui/core/colors';
 import Blocks from './Blocks';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag bck="#0e1731"
                    size="50px"
                    color='#ffffff'
                    link={true} 
                    linkto="/the_matches"
                >
                    Matches
           </Tag>
           <Blocks/>

                <Tag
                    bck="#ffffff"
                    size="22px"
                    color='#0e1731' 
                    link={true}
                    linkto="/the_teams"
                >See More Matches</Tag>

            </div>
        </div>
    )
}

export default MatchesHome;