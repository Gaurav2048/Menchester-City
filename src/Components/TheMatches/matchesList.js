import React, { Component } from 'react'
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';


export default class MatchesList extends Component {

    state = {
        matchesList: []
    }

    static getDerivedStateFromProps(props, state) {
        return state = {
            matchesList: props.match
        }
    }

    showMatches = () => (
        this.state.matchesList ?
            <NodeGroup
                data={this.state.matchesList}
                keyAccessor={(d) => d.id}
                start={() => ({
                    opacity: [0],
                    x: [-200]
                })}

                enter={(d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                })}

                update={((d, i) => ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                }))}

                leave={((d, i) => ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 500, delay: i * 50, ease: easePolyOut }
                }))}

            >
                {(nodes) => (
                    <div>
                        {nodes.map(({
                            key, data, state: { x, opacity }
                        }) => (
                                <div className="match_box_big"
                                    key={key}
                                    style={{
                                        opacity,
                                        transform: `translate(${x}px)`
                                    }}
                                >
                                    <div className="block_wraper">
                                        <div className="block">
                                            <div className="icon" style={{background:`url(/images/team_icons/${data.localThmb}.png) no-repeat`}}></div>
                                            <div className="team">{data.local}</div>
                                            <div className="team">{data.resultLocal}</div>
                                        </div>

                                        <div className="block">
                                            <div className="icon" style={{background:`url(/images/team_icons/${data.awayThmb}.png) no-repeat`}}></div>
                                            <div className="team">{data.away}</div>
                                            <div className="team">{data.resultAway}</div>
                                        </div>


                                    </div>

                                    <div className="block_wraper nfo">
                                        <div><strong>date : {data.date}</strong> </div>
                                        <div><strong>Stadium : {data.stadium}</strong> </div>
                                        <div><strong>Referee : {data.referee}</strong> </div>

                                    </div>

                                </div>
                            ))}
                    </div>
                )}
            </NodeGroup>
            :
            null
    )

    render() {
        console.log();

        return (
            <div>
                {this.showMatches()}
            </div>
        )
    }
}
