import React, { Component } from 'react'
import '../App.css'
import SearchBar from './SearchBar'



class Loader extends Component {
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
  


  export default Loader