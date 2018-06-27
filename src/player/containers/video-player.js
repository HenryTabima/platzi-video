import React, { Component } from 'react'
import VideoPlayerLayout from '../components/video-player-layout'
import Video from '../components/video'
import Title from '../components/title'
import PlayPause from '../components/play-pause'
import Timer from '../components/timer'
import Controls from '../components/video-player-controls'
import formattedTime from '../../libs/format-time'
import ProgressBar from '../components/progress-bar'
import Spinner from '../components/spinner'
import Volume from '../components/volume'
import FullScreen from '../components/full-screen'
import { isFullScreen, requestFullScreen, exitFullScreen } from '../../libs/full-screen'

class VideoPlayer extends Component {
  state = {
    duration: 0,
    currentTime: 0,
    pause: true,
    loading: false,
    volume: 1,
    volumeBar: 1,
    muted: false
  }
  tooglePlay = (event) => {
    this.setState({
      pause: !this.state.pause
    })
  }
  componentDidMount () {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }
  handleLoadedMetadata = (event) => {
    this.video = event.target
    this.setState({
      duration: this.video.duration
    })
  }
  handleTimeUpdate = (event) => {
    this.setState({
      currentTime: this.video.currentTime
    })
  }
  handleProgressChange = (event) => {
    this.video.currentTime = event.target.value
  }
  handleSeeking = (event) => {
    this.setState({
      loading: true
    })
  }
  handleSeeked = (event) => {
    this.setState({
      loading: false
    })
  }
  handleVolumeChange = (event) => {
    this.video.volume = event.target.value
    this.setState({
      volume: event.target.value,
      volumeBar: event.target.value,
      muted: false
    })
  }
  handleVolumeClick = (event) => {
    this.video.volume = this.state.muted ? this.state.volume : 0
    this.setState({
      volumeBar: this.state.muted ? this.state.volume : 0,
      muted: !this.state.muted
    })
  }
  handleFullScreenClick = (event) => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      requestFullScreen(this.player)
    }
  }
  setRef = (element) => {
    this.player = element
  }
  render () {
    return (
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title
          title={this.props.title}
        />
        <Controls>
          <PlayPause
            pause={this.state.pause}
            handleClick={this.tooglePlay}
          />
          <Timer
            duration={formattedTime(this.state.duration)}
            currentTime={formattedTime(this.state.currentTime)}
          />
          <ProgressBar
            duration={this.state.duration}
            value={this.state.currentTime}
            handleProgressChange={this.handleProgressChange}
          />
          <Volume
            volume={this.state.volumeBar}
            handleVolumeChange={this.handleVolumeChange}
            handleVolumeClick={this.handleVolumeClick}
          />
          <FullScreen
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner active={this.state.loading} />
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          src={this.props.src}
        />
      </VideoPlayerLayout>
    )
  }
}

export default VideoPlayer
