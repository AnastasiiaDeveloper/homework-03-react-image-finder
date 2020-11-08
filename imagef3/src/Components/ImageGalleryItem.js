import React, { Component } from "react";


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
  
  
  export default ImageGalleryItem 
