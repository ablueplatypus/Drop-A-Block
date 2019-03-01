import React, { Component } from 'react';


class Music extends Component {
  constructor(props) {
  super(props)

  this.url = "https://ia800504.us.archive.org/33/items/TetrisThemeMusic/Tetris.mp3"
  this.audio = new Audio(this.url)

  }
  state = {
    play: false,
    pause: true,
  }

  play = () => {
    this.setState ({
      play: true,
      pause: false
    })
    this.audio.play()
  }

  pause = () => {
    this.setState({
      play: false,
      pause: true
    })
    this.audio.pause()
  }
  render() {
    return (
      <div>
        <button onClick={this.play}>Play</button>
        <button onClick={this.pause}>Pause</button>
      </div>
    )
  }

}

export default Music;
