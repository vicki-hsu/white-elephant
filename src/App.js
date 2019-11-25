import React from 'react';
import { Button } from 'react-bootstrap';
import './App.scss'

const img_success = "https://media.giphy.com/media/gixQfE7XzZfpe/giphy.gif"
const img_fail = "https://media.giphy.com/media/QBGe6zi0O1aaWxeR8i/giphy.gif"
const img_countdown = "https://thumbs.gfycat.com/DismalWhisperedEastsiberianlaika-small.gif"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function coinFlip() {
  return (Math.floor(Math.random() * 2) === 0) ? "heads" : "tails";
}

class GameImage extends React.Component {
  render() {
    return (
      <div>
        <div className="img-text">
          <span 
            className={`h1 center-block text-center`} 
            style={{ marginBottom: 25, fontSize: 60, fontFamily: "Courier New", fontWeight: "bolder" }}>{this.props.value}
          </span>
        </div>
        <img 
          src={ this.props.img_display }
          width={ 200 }
          height={ 200 }
          className="center-block text-center"
          vspace={ 10 }
        />
      </div>
    )
  }
}

class GameButton extends React.Component {
  render() {
    return (
      <Button 
        variant="success" 
        size="lg"
        onClick={this.props.onClick}
      >
        Challenge!
      </Button>
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "Ready",
      number_of_heads: 0,
      number_of_tails: 0,
      img_display: "https://webstockreview.net/images600_/hello-clipart-15.png"
    }
  }

  handleClick() {
    var coin_flip_result = coinFlip()
    this.setState({value: coin_flip_result})
    if (coin_flip_result === "heads") {
      this.setState({number_of_heads: this.state.number_of_heads + 1})
      this.setState({img_display: img_success})
      this.setState({value: "STOLEN!"})
    } else {
      this.setState({number_of_tails: this.state.number_of_tails + 1})
      this.setState({img_display: img_fail})
      this.setState({value: "SAFE!"})
    }
  }

  async countDown() {
    this.setState({img_display: img_countdown})
    this.setState({value: "This gift is..."})
    await sleep(3000);
    this.handleClick();
  }
  
  render() {
  
    const parentContainerStyles = {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'table'
    };
    
    const subContainerStyles = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'table-cell',
      verticalAlign: 'middle'
    };
    
    return (
      <div style={parentContainerStyles}>
        <div style={subContainerStyles}>
        
        <div className="game">
          <div className="game-image">
            <GameImage
              value={this.state.value}
              img_display={this.state.img_display}
            />
          </div>
          <div className="center-block text-center">
            <GameButton
              onClick={() => this.countDown()}
            />
          </div>
          <div className="status">
            <span className={`h3 center-block text-center`}>{"Status"}</span>
          </div>
          <div className="number-of-heads">
            <span className={`h4 center-block text-center`} style={{ marginBottom: 25 }}>{"Number of Stolen Gifts: " + this.state.number_of_heads}</span>
          </div>
          <div className="number-of-tails">
            <span className={`h4 center-block text-center`} style={{ marginBottom: 25 }}>{"Number of Safe Gifts: " + this.state.number_of_tails}</span>
          </div>
        </div>
          
        </div>
      </div>
    );
    
  }
  
}

export default Game;
            // <span className={`h1 center-block text-center`} style={{ marginBottom: 25 }}>{this.state.value}</span>