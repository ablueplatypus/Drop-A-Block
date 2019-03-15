import React, { Component } from 'react';
import './App.css';
import CanvasDrawing from './CanvasDrawing'

class App extends Component {
  constructor(props) {
  super(props)

  this.url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"
  this.lineClear = "http://www.vertigogaming.org/downloads/svencoop/sound/sc_tetris/clear.wav"
  this.piecePlaced = "http://www.bndclan.com/Bend3r/Bend3r/hl-content/cstrike/sound/tetris/fall.wav"
  this.gameOverSound = "http://mattersofgrey.com/audio/superMarioBros-gameOver.mp3"
  this.gameOverAudio = new Audio(this.gameOverSound)
  this.placedAudio = new Audio (this.piecePlaced)
  this.lineClearAudio = new Audio(this.lineClear)
  this.audio = new Audio(this.url)

  }

  state = {
    play: false,
    pause: true,
    stop: false,
    statData: [],
    initials: '',
    line: 0,
    score: 0

  }

  componentDidMount() {
    // this.getUserData()
  }

  // getUserData = () => {
  //   return fetch(`http://${window.location.hostname}:9000/api/v1/stats`)
  //     .then(res => res.json())
  //     .then(statData => {
  //       this.setState({
  //         statData: statData
  //       })
  //     })
  //   }

  play = () => {
    this.setState ({
      play: true,
      pause: false
    })
    this.audio.loop = true;
    this.audio.play()
  }

  // stops music from playing
  stop = () => {
    this.setState({
      play: false,
      stop: true
    })
    this.audio.pause()
    this.audio.currentTime = 0
  }

  gameOverSoundHandler = () => {
    this.gameOverAudio.play()
  }

  playLineClear = () => {
    this.lineClearAudio.play()
  }

  pauseTheme = (e) => {
    e.preventDefault()
    this.setState({
      play: false,
      pause: true
    })
    this.audio.pause()
  }
  // falling tetris piece sound.
  playFall = () => {
    this.placedAudio.play()
  }

  // gets the game score and line clear count form state of CanvasDrawing
  getStats = (stats) => {
    // console.log('in app',stats.line);
    this.setState({
      line: stats.line,
      score: stats.score
    })
  }

  handleInitialChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      initials: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // console.log('hi', this.state);
    fetch(`https://drop-a-block-api.herokuapp.com/api/v1/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        initials: this.state.initials.toUpperCase(),
        high_score: this.state.score,
        line_clear: this.state.line
      })
    }).then(
      setTimeout(()=>{
        this.getUserData()
      }, 50)
    )
    document.getElementById('initial-input-form').reset()
    document.querySelector('.initial-input').style.visibility = "hidden"
    document.querySelector('.gameOver').style.visibility = "hidden"
    // clear board here.
    document.querySelector('.leaderboard').style.visibility = "visible"
  } // end of handleSubmit


  getUserData = () => {
    // console.log("Fetching user data")
    return fetch(`https://drop-a-block-api.herokuapp.com/api/v1/stats`)
      .then(res => res.json())
      .then(statData => {
        this.setState({
          statData: statData
        }/*,() => console.log(this.state.statData)*/)
      })
    }


  render() {
    return (
        <div className="App">
          <CanvasDrawing
            state={this.state}
            play={this.play}
            pause={this.pauseTheme}
            stopMusic={this.stop}
            lineClearSound={this.playLineClear}
            playFallSound={this.playFall}
            gameOverSound={this.gameOverSoundHandler}
            handleKeyPress={this.handleKeyPress}
            getStats={this.getStats}
            getContext={this.getContext}
            statData={this.state.statData}
            getUserData={this.getUserData}
            />
          <div className="initial-input">
            <form id="initial-input-form" onSubmit={this.handleSubmit}>
              <input onChange={this.handleInitialChange} className="blinking" type="text" maxLength="3" placeholder="Enter Initials"/>
            </form>
          </div>
          <div className="gameOver blinking-game-over">
            <p>Game Over</p>
          </div>
        </div>
    );
  }
}

export default App;
