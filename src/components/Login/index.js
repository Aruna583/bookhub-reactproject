import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="user-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onTogglePassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          className="login-website-logo-mobile-image"
          src="https://res.cloudinary.com/ddectomha/image/upload/v1663048052/Ellipse_99_1x_ibezw2.png"
          alt="login website logo"
        />
        <img
          src="https://res.cloudinary.com/ddectomha/image/upload/v1663046032/Rectangle_1467_1x_h2xse1.png"
          className="login-image"
          alt="website login"
        />
        <div className="login-container">
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
            <img
              src="https://res.cloudinary.com/ddectomha/image/upload/v1663048623/bookhub_logo_gkmrd6.png"
              alt="website logo"
              className="login-website-logo-mobile-name-image"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            {/*  <div className="show-container">
              <input
                type="checkBox"
                id="show"
                className="password-input-field"
                onChange={this.onTogglePassword}
              />
              <label className="show-name" htmlFor="show">
                Show Password
              </label>
            </div> */}
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
