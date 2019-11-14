import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Menu from './MenuComponents'
import Slideshow from './components/Images/Slideshow'
import SlideshowGallery from './components/Images/SlideshowGallery'
import ModalImage from './components/Images/ModalImage'

const slides = [
  { src: 'images/banner1.jpg', caption: 'Caption Text' },
  { src: 'images/banner2.jpg', caption: 'Caption Two' },
  { src: 'images/banner3.jpg', caption: 'Caption Three' }
]

const gallerySlides = [
  { src: 'images/gallery1.jpg', caption: 'Caption Text' },
  { src: 'images/gallery2.jpg', caption: 'Caption Two' },
  { src: 'images/gallery3.jpg', caption: 'Caption Three' },
  { src: 'images/gallery4.jpg', caption: 'Caption Four' },
  { src: 'images/gallery5.jpg', caption: 'Caption Five' },
  { src: 'images/gallery6.jpg', caption: 'Caption Six' }
]

const modalImage = { src: 'images/modal-image.jpg' }

const Application = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <Router>
      <Menu />
      <div style={{ flex: 5 }}>
        <Switch>
          <Route exact path="/slideshow"><Slideshow slides={slides}/></Route>
          <Route path="/slideshow-gallery"><SlideshowGallery slides={gallerySlides}/></Route>
          <Route path="/modal-images"><ModalImage image={modalImage} /></Route>
        </Switch>
      </div>
    </Router>
  </div>
)

export default Application