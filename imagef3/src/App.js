import React, { Component } from 'react'
import './App.css'

class App extends Component {
  async onSubmit(query, multiplier = 1) {
    const key = '17979283-965b1254f018720ae64398a3a'
    const url = `https://pixabay.com/api/?q=${query}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=${15 * multiplier}`
    const response = await fetch(url)
    const images = await response.json()

    return images.hits
  }

  render() {
    return (
      <SearchBar onSubmit={this.onSubmit} />
    )
  }
}

class SearchBar extends Component {
  state = {
    images: [],
  }

  getQuery() {
    const input = document.getElementById('search')
    return input.value
  }

  async search() {
    const query = this.getQuery()
    const images = await this.props.onSubmit(query)
    this.setState({ images })
  }

  loadMore = images => this.setState({ images })

  render() {
    return (
      <>
        <header className="Searchbar">
          <div className="SearchForm">
            <button
              type="submit"
              className="SearchForm-button"
              onClick={() => this.search()}
            >
              <span className="SearchForm-button-label">
                Search
              </span>
            </button>
            <input
              id="search"
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </div>
        </header>
        <ImageGallery images={this.state.images} />
        <Modal />
        {this.state.images.length > 0 ?
          <Button
            query={this.getQuery()}
            onSubmit={this.props.onSubmit}
            loadMore={this.loadMore}
          /> :
          null}
      </>
    )
  }
}

const ImageGallery = props => (
  <ul className="ImageGallery">
    {props.images.map(image =>
      <ImageGalleryItem
        preview={image.webformatURL}
        largeImage={image.largeImageURL}
      />)}
  </ul>
)

class ImageGalleryItem extends Component {
  showModal(src) {
    const modal = document.getElementById('modal')
    const modalImg = document.getElementById('modalImg')
    
    modal.style.display = 'block'
    modalImg.src = src

    window.onclick = event => {
      if (event.target === modal) {
        modal.style.display = 'none'
      }
    }
  }

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.preview}
          className="ImageGalleryItem-image"
          onClick={() => this.showModal(this.props.largeImage)}
        />
      </li>
    )
  }
}

const Modal = () => (
  <div
    id="modal"
    className="modal"
  >
    <img
      className="modal-content"
      id="modalImg"
    />
  </div>
)

class Button extends Component {
  query = ''
  multiplier = 2

  async loadMore() {
    if (!this.query) {
      this.query = this.props.query
    }

    if (this.query !== this.props.query) {
      this.query = this.props.query
      this.multiplier = 2
    }

    const images = await this.props.onSubmit(this.query, this.multiplier++)
    this.props.loadMore(images)

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  render() {
    return (
      <button
        className="Button"
        onClick={() => this.loadMore()}
      >
        Load more...
      </button>
    )
  }
}

export default App
