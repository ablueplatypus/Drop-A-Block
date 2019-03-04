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
    stop: false
  }

  play = () => {
    this.setState ({
      play: true,
      pause: false
    })
    this.audio.play()
  }

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

  playFall = () => {
    this.placedAudio.play()
  }


  render() {
    return (
        <div className="App">
          <CanvasDrawing
            music={this.state}
            play={this.play}
            pause={this.pauseTheme}
            stopMusic={this.stop}
            lineClearSound={this.playLineClear}
            playFallSound={this.playFall}
            gameOverSound={this.gameOverSoundHandler}
            handleKeyPress={this.handleKeyPress}
            />
            <div className="gameOver">
              <p>Game Over</p>
            </div>
        </div>
    );
  }
}

export default App;
