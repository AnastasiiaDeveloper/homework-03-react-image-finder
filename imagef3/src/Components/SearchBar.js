
import React, { Component } from 'react'

import Button from './Button'
import Modal from './Modal'
import ImageGallery from './ImageGallery'

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


export default SearchBar