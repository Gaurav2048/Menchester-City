import React, { Component } from 'react'
import PlayerCard from '../ui/playerCard';
import Fade from 'react-reveal';
import Stripes from '../../Resources/images/stripes.png';

import {firebasePlayers , firebase} from '../../Firebase';
import {firebaselooper } from '../ui/misc';
import {Promise} from 'core-js';


export default class TheTeam extends Component {

  state = {
    isLoading:false,
    players:[]
  }

  componentDidMount(){
    firebasePlayers.once('value').then(snapshot=>{
      const players = firebaselooper(snapshot);
      let promises = [];
      for(let key in players){
        promises.push(
          new Promise((resolve, reject) => {
            firebase.storage().ref('players')
            .child(players[key].image).getDownloadURL()
            .then(url => {
              players[key].url = url; 
              resolve();
            })
          })
        )
      }

      Promise.all(promises).then(()=>{
        this.setState({
          isLoading:false,
          players
        })
      })
    })
  }

  showPlayersBycategory=(category) =>(
      this.state.players ? 
            this.state.players.map((player,i) =>{
              return player.position === category ? 
                    <Fade left delay = {200*i} key={i}>
                        <div className="item">
                          <PlayerCard 
                              number={player.number}
                              name={player.name}
                              lastname={player.lastname}
                              bck={player.url}
                              />  
                        </div>
                    </Fade>
              :
              null
            })
      : null
  )
  render() {
    console.log(this.state.players);
    
    return (
      <div className="the_team_container"
      style={{background: `url(${Stripes}) repeat`}} 
      >
        {
          !this.state.isLoading ?
          <div>
            <div className="team_category_wrapper">
              <div className="title">
                Keeper
              </div>  
              <div className="team_cards">
                {this.showPlayersBycategory("Keeper")} 
              </div>          
            </div>

            <div className="team_category_wrapper">
              <div className="title">
                Defense
              </div>  
              <div className="team_cards">
                {this.showPlayersBycategory("Defence")} 
              </div>          
            </div>

            <div className="team_category_wrapper">
              <div className="title">
                Mid Field
              </div>  
              <div className="team_cards">
                {this.showPlayersBycategory("Midfield")} 
              </div>          
            </div>

            <div className="team_category_wrapper">
              <div className="title">
                Strikers
              </div>  
              <div className="team_cards">
                {this.showPlayersBycategory("Striker")} 
              </div>          
            </div>


          </div>
          :
          null
        }
      </div>
    )
  }
}
