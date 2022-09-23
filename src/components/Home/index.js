import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {TopRatedApiStatus: apiStatus.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({TopRatedApiStatus: apiStatus.inProgress})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const bookList = fetchedData.books
      const updatedData = bookList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState({
        TopRatedApiStatus: apiStatus.success,
        topRatedBooks: updatedData,
      })
    } else {
      this.setState({TopRatedApiStatus: apiStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  successView = () => {
    const {topRatedBooks} = this.state
    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          const onClickTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }
          return (
            <div className="top-rated-book-item-container" key={id}>
              <button
                className="top-rated-book-image-container"
                type="button"
                onClick={onClickTopRatedBook}
              >
                <img
                  className="top-rated-book-image"
                  src={coverPic}
                  alt={title}
                />
                <h1 className="top-rated-book-name" key="title">
                  {title}
                </h1>
                <p className="top-rated-book-author">{authorName}</p>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  progressView = () => (
    <div className="loader-spinner" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {TopRatedApiStatus} = this.state
    switch (TopRatedApiStatus) {
      case apiStatus.success:
        return <>{this.successView()}</>
      case apiStatus.inProgress:
        return <>{this.progressView()}</>
      case apiStatus.failure:
        return <>{this.failureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home-bg-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            type="button"
            className="home-find-books-btn books-responsive-btn-sm"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>

          <div>
            <div className="home-top-rated-container">
              <div className="top-rated-container">
                <h1 className="top-rated-heading" key="title">
                  Top Rated Books
                </h1>
                <button
                  type="button"
                  className="home-find-books-btn books-responsive-btn-lg"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
