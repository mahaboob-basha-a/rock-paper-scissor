import {Component} from 'react'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {RiCloseLine} from 'react-icons/ri'

import ScoreView from '../ScoreView'

import GameResults from '../GameResults'

import './index.css'

import {
  MainContainer,
  RulesView,
  PopUpView,
  PopUpImage,
} from './styledComponents'

class Home extends Component {
  state = {
    isShow: true,
    newArray: [this.props.choicesList[0], this.props.choicesList[1]],
    text: 'YOU WON',
    score: 0,
  }

  getResult = (item1, item2) => {
    if (item1.id === 'ROCK') {
      switch (item2.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (item1.id === 'PAPER') {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (item2.id) {
        case 'ROCK':
          return 'YOU LOSE'
        case 'PAPER':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  restartGame = () => this.setState({isShow: true})

  checkResult = id => {
    const {score} = this.state
    const choice2 =
      this.props.choicesList[
        Math.floor(Math.random() * this.props.choicesList.length)
      ]
    const choice1 = this.props.choicesList.filter(
      eachValue => eachValue.id === id,
    )
    const result = this.getResult(choice1[0], choice2)
    let newScore = score
    if (result === 'YOU WON') {
      newScore = score + 1
    } else if (result === 'YOU LOSE') {
      newScore = score - 1
    } else {
      newScore = score
    }
    this.setState({
      isShow: false,
      newArray: [choice1[0], choice2],
      text: result,
      score: newScore,
    })
  }

  render() {
    const {isShow, newArray, text, score} = this.state
    const {choicesList} = this.props
    return (
      <MainContainer>
        <ScoreView score={score} />
        <GameResults
          choicesList={choicesList}
          text={text}
          isShow={isShow}
          newArray={newArray}
          checkResult={this.checkResult}
          restartGame={this.restartGame}
        />
        <RulesView>
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                RULES
              </button>
            }
          >
            {close => (
              <PopUpView>
                <button
                  type="button"
                  className="trigger-button-close"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
                <PopUpImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </PopUpView>
            )}
          </Popup>
        </RulesView>
      </MainContainer>
    )
  }
}

export default Home
