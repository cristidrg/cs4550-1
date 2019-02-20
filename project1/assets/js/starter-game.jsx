import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Starter channel={channel}/>, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      gameIsFull: true,
    };
    this.channel
      .join()
      .receive("ok", resp => {this.setState(resp.game);})
      .receive("error", resp => { console.log("Unable to join", resp); });
  }

  render() {

    let gameStatus = "Game is full";
    let playerBoard = null;
    let enemyBoard = null;
    console.log(this.state);
    if (!this.state.gameIsFull) {
      if (this.state.winner) {
        gameStatus = "Winner is " + this.state.winner;
      }
      else if (this.state.ship1.length == 0) {
        gameStatus = "Place your first ship";
      }
      else if (this.state.ship2.length == 0) {
        gameSatus = "Place your second ship";
      }
      else if (this.state.gameReady) {
        //TODO: code to generate boards
        if (this.state.yourTurn) {
          gameStatus = "Place your attack";
        }
        else {
          gameStatus = "Waiting for enemy move";
        }
      }
      else {
        gameStatus = "Wait for other player";
      }
    }
    return (<div>
      <div>{gameStatus}</div>
      <div>{playerBoard}</div>
      <div>{enemyBoard}</div>
    </div>)
  }
}
