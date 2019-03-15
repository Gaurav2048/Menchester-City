import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebasedb, firebaseMatches } from '../../Firebase';
import { firebaselooper, reverseAnArray } from '../../Components/ui/misc';
import { reverse } from 'dns';
import LeagueTable from './table';
import MatchesList from './matchesList';


export default class TheMatches extends Component {

  state = {
    loading: true,
    matches: [],
    filterMatches: [],
    playerFilter: 'All',
    resultFilter: 'All'
  }

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      const matches = firebaselooper(snapshot);
      this.setState({
        laoding: false,
        matches: reverseAnArray(matches),
        filterMatches: reverseAnArray(matches),

      });

    })
  }

  showFilter = (played) => {
    const list = this.state.matches.filter(match => {
      return match.final === played
    });
    this.setState({
      filterMatches: played === 'All' ? this.state.matches : list,
      playerFilter: played,
      resultFilter: 'All'
    })
  }

  showResult=(result)=>{
    const list = this.state.matches.filter(match => {
      return match.result === result
    });
    this.setState({
      filterMatches: result === 'All' ? this.state.matches : list,
      playerFilter: 'All',
      resultFilter: result 
    })
  }

  render() {
    console.log(this.state.filterMatches);

    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">
                  Show match
                    </div>
                <div className="cont">
                  <div className={`option ${this.state.playerFilter === 'All' ? 'active' : ''}`} onClick={() => this.showFilter('All')}>All</div>
                  <div className={`option ${this.state.playerFilter === 'Yes' ? 'active' : ''}`} onClick={() => this.showFilter('Yes')}>Played</div>
                  <div className={`option  ${this.state.playerFilter === 'No' ? 'active' : ''}`} onClick={() => this.showFilter('No')}>Not Played</div>

                </div>
              </div>


              <div className="match_filters_box">
                <div className="tag">
                  Result Game
                    </div>
                <div className="cont">
                  <div className={`option ${this.state.resultFilter === 'All' ? 'active' : ''}`} onClick={() => this.showResult('All')}>All</div>
                  <div className={`option ${this.state.resultFilter === 'W' ? 'active' : ''}`} onClick={() => this.showResult('W')}>W</div>
                  <div className={`option  ${this.state.resultFilter === 'L' ? 'active' : ''}`} onClick={() => this.showResult('L')}>L</div>
                  <div className={`option  ${this.state.resultFilter === 'D' ? 'active' : ''}`} onClick={() => this.showResult('D')}>D</div>

                </div>

              </div>

            </div>
            <MatchesList match={this.state.filterMatches} />
          </div>

          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    )
  }
}
