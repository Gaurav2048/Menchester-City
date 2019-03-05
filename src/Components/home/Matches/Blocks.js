import React, { Component } from 'react'
import { firebaseMatches } from '../../../Firebase';
import { firebaselooper, reverseAnArray } from '../../ui/misc';
import Matches_block from '../../ui/matches_block';
import Slide from 'react-reveal';


export default class Blocks extends Component {
    state = {
        matches: []
    }

    componentDidMount() {
        firebaseMatches.limitToLast(6).once('value').then((snapshot) => {
            const matches = firebaselooper(snapshot);
            this.setState({ matches: reverseAnArray(matches) });

        })
    }

    showMatches = (matches) => (
        matches ? 
            matches.map((match) => (
                <Slide bottom  key={match.id} >
                    <div className="item">
                        <div className="wrapper">
                            <Matches_block match={match} />
                        </div>
                    </div>
                </Slide>

            ))
            : null

    )
    render() {
        console.log(this.state);

        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}

