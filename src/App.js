import React, { Component } from 'react';
import './App.css';
import CanvasDrawing from './CanvasDrawing'

class App extends Component {
  constructor(props) {
  super(props)

  this.url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"
  this.lineClear = "http://www.vertigogaming.org/downloads/svencoop/sound/sc_tetris/clear.wav"
  this.lineClearAudio = new Audio(this.lineClear)
  this.audio = new Audio(this.url)

  }

  state = {
    play: false,
    pause: true,
    stop: true,

  }

  play = () => {
    this.setState ({
      play: true,
      pause: false
    })
    this.audio.play()
  }

  playLineClear = () => {
    this.setState ({
      play: true
    })
    this.lineClearAudio.play()
  }

  pauseTheme = () => {
    this.setState({
      play: false,
      pause: true
    })
    this.audio.pause()
  }



  render() {
    return (
      <div className="App">
        <CanvasDrawing play={this.play} pause={this.pauseTheme} lineClearSound={this.playLineClear}/>
      </div>
    );
  }
}

export default App;
