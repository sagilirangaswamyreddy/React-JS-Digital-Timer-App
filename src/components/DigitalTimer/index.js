// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    countDownStarted: false,
    minutes: 25,
    seconds: 0,
    selectedMinutes: 25,
  }

  tick = () => {
    const {countDownStarted, minutes, seconds} = this.state
    if (countDownStarted) {
      if (seconds > 0) {
        this.setState({seconds: seconds - 1})
      } else if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.timerID)
          this.setState({countDownStarted: !countDownStarted})
        } else {
          this.setState({minutes: minutes - 1})
          this.setState({seconds: 59})
        }
      }
    } else {
      clearInterval(this.timerID)
    }
    console.log(seconds)
    console.log(minutes)
  }

  onToggleStart = () => {
    const {countDownStarted} = this.state

    if (countDownStarted === true) {
      clearInterval(this.timerID)
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }

    this.setState({
      countDownStarted: !countDownStarted,
    })
  }

  onDecrement = () => {
    const {countDownStarted, minutes, selectedMinutes} = this.state
    if (countDownStarted === false && minutes > 1) {
      this.setState({
        minutes: minutes - 1,
        selectedMinutes: selectedMinutes - 1,
      })
    }
  }

  onIncrement = () => {
    const {countDownStarted, minutes, selectedMinutes} = this.state
    if (countDownStarted === false && minutes < 60) {
      this.setState({
        minutes: minutes + 1,
        selectedMinutes: selectedMinutes + 1,
      })
    }
  }

  onReset = () => {
    this.setState({countDownStarted: false})
    this.setState({minutes: 25})
    this.setState({seconds: 0})
    this.setState({selectedMinutes: 25})
  }

  render() {
    const {countDownStarted, minutes, seconds, selectedMinutes} = this.state
    const imgUrl = countDownStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altText = countDownStarted ? 'pause icon' : 'play icon'
    const displayText = countDownStarted ? 'Pause' : 'Start'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-and-buttons-container">
          <div className="time-bg-container">
            <div className="time-container">
              <h1 className="time">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="running-pause-para">
                {countDownStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="start-reset-timer-limit-container">
            <div className="start-reset-container">
              <div className="single-logo-text-container">
                <button
                  className="reset-btn-styles single-logo-text-container"
                  type="button"
                  onClick={this.onToggleStart}
                >
                  <img className="icon-styles" src={imgUrl} alt={altText} />
                  <p className="logo-para-styles">{displayText}</p>
                </button>
              </div>
              <div className="single-logo-text-container">
                <button
                  onClick={this.onReset}
                  className="reset-btn-styles single-logo-text-container"
                  type="button"
                >
                  <img
                    className="icon-styles"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="logo-para-styles">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="minus-and-plus-container">
              <button
                onClick={this.onDecrement}
                className="plus-minus-styles"
                type="button"
              >
                -
              </button>
              <p className="time-limit-num">{selectedMinutes}</p>
              <button
                onClick={this.onIncrement}
                className="plus-minus-styles"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
