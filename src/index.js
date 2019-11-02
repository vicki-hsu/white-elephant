import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

class GameImage extends React.Component {
  render() {
    return (
      <div>
        {this.props.value}
      </div>
    )
  }
}

class GameButton extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        > Challenge!
      </button>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "some kind of null",
      number_of_heads: 0,
      number_of_tails: 0,
    }
  }

  handleClick() {
    var coin_flip_result = coinFlip()
    this.setState({value: coin_flip_result})
    if (coin_flip_result == "heads") {
      this.setState({number_of_heads: this.state.number_of_heads + 1})
    } else {
      this.setState({number_of_tails: this.state.number_of_tails + 1})
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-image">
          <GameImage
            value={this.state.value}
          />
        </div>
        <div className="game-button">
          <GameButton
            onClick={() => this.handleClick()}
          />
        </div>
        <div className="game-info">
          <div>Status</div>
          <ul>
            <li>Number of heads: {this.state.number_of_heads}</li>
            <li>Number of tails: {this.state.number_of_tails}</li>
          </ul>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
