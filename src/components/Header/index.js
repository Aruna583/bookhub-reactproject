import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickMenu = () => {
    this.setState(prevState => ({displayNavbar: !prevState.displayNavbar}))
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickCross = () => {
    this.setState({displayNavbar: false})
  }

  render() {
    const {home, shelves, favorite} = this.props
    const activeHome = home ? `active-tab-item` : ''
    const activeShelves = shelves ? `active-tab-item` : ''
    const activeFavorite = favorite ? `active-tab-item` : ''
    const {displayNavbar} = this.state
    return (
      <div>
        <div className="header-container">
          <div className="header-logo-one">
            <Link to="/">
              <>
                <img
                  className="header-logo"
                  src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                  alt="website logo"
                />
              </>
            </Link>
          </div>
          <ul className="heder-options-container">
            <Link to="/" className="link">
              <li className={`list-item options-tab ${activeHome}`}>Home</li>
            </Link>
            <Link to="/shelf" className="link">
              <li className={`list-item options-tab ${activeShelves}`}>
                Bookshelves
              </li>
            </Link>
            <Link to="/favorites" className="link">
              <li className={`list-item options-tab ${activeFavorite}`}>
                MyFavorites
              </li>
            </Link>

            <li className="list-item">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-responsive-container">
          <div className="header-nav-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647190320/Group_7731_v0p1nt_gjeokw.png"
                className="header-navbar-website-logo"
                alt="website logo"
              />
            </Link>
            <button
              className="cross-icon-btn"
              onClick={this.onClickMenu}
              type="button"
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>

          {displayNavbar && (
            <>
              <div className="header-navbar-tabs-container">
                <Link className="link" to="/">
                  <h1 className={`home-tab ${activeHome}`}>Home</h1>
                </Link>
                <Link className="link" to="/shelf">
                  <h1 className={`home-tab ${activeShelves}`}>BookShelves</h1>
                </Link>
                <Link className="link" to="/favorites">
                  <h1 className={`home-tab ${activeFavorite}`}>MyFavorites</h1>
                </Link>
              </div>
              <div className="header-navbar-tabs-container">
                <button
                  onClick={this.onClickLogout}
                  className="logout-btn"
                  type="button"
                >
                  Logout
                </button>
                <button
                  onClick={this.onClickCross}
                  className="cross-icon-btn"
                  type="button"
                >
                  <RiCloseCircleFill className="cross-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
