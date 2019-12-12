import React from 'react';
import { Button } from 'react-bootstrap';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
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
          width={ 600 }
          height={ 600 }
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
      img_display: "https://media.giphy.com/media/uRD0V1GreQuru/giphy.gif"
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
            <span className={`h2 center-block text-center`} style={{ marginBottom: 25 }}>{"Number of Stolen Gifts: " + this.state.number_of_heads}</span>
          </div>
          <div className="number-of-tails">
            <span className={`h2 center-block text-center`} style={{ marginBottom: 25 }}>{"Number of Safe Gifts: " + this.state.number_of_tails}</span>
          </div>
        </div>

        <div className="instructions">
        <Accordion style={{width: '100%'}} allowZeroExpanded={true}>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        The Probabilistic White Elephant: Rules of the Road
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p><b>Starting with Player #1, they either: </b></p>
                    <p><b>a) Pick from The Pool of gifts and opens, or </b></p>
                    <p><b>b) Challenge to steal a non-stolen gift from another Player.</b></p>
                    <p><b>(Note: with the first person, their only option is (a), but starting with #2 and beyond, both (a) and (b) are valid options.)</b></p>

                    <p><b>If the Player challenges, then the person with the gift can either freely give it to the Player, or can enter into the challenge, in which case the success of the steal is determined by a coin flip.  If the gift is successfully stolen, then that gift is labeled "stolen" for that round (i.e., it can no longer be challenged for that round). </b></p>

                    <p><b>If an unsuccessful challenge occurs, then the Player must choose to challenge another gift or pick from The Pool. </b></p>

                    <p><b>If a successful challenge occurs, then the person who just gave up the gift must now choose either option (a) or (b).  Note that a gift can only be *stolen* once per round, but a key point is that it can be *challenged* multiple times per round. </b></p>

                    <p><b>The round ends once a gift is selected from The Pool, and the game ends at the end of the last round.</b></p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Who is the Ultimate Winner?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                      <span
                        className={`center-block text-center`}
                        style={{ marginBottom: 25, fontSize: 32, fontFamily: "Courier New", fontWeight: "bolder" }}>{"EVERYBODY! HAPPY HOLIDAYS!!!"}
                      </span>
                      <img
                        src="https://media.giphy.com/media/9w475hDWEPVlu/giphy.gif"
                        width={ 200 }
                        height={ 200 }
                        className="center-block text-center"
                      />
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        </div>

        </div>
      </div>
    );

  }

}

export default Game;
