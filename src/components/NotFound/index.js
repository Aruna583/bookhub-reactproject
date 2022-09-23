import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="not found"
      src="https://res.cloudinary.com/ddectomha/image/upload/v1663049978/Group_7484_1x_yfq5gc.png"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button className="go-back-home-btn" type="button">
        Go Back To Home
      </button>
    </Link>
  </div>
)

export default NotFound
