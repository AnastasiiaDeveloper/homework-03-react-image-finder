import React, { Component } from "react";


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
  
  export default Button
  