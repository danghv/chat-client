import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { PrevButton, NextButton } from './Slideshow'

const Slide = styled.div`
  display: ${props => props.show ? 'block' : 'none'};

  img {
    width: 100%;
  }
  .demo {
    opacity: 0.6;
  }
  .cursor: {
    cursor: pointer;
  }

  .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
  }

  .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
  }
`

const SlideshowGalleryWrapper = styled.div`
  position: relative;
`

const Thumbnail = styled.div`
  float: left;
  width: 16.66%;

  img {
    width: 100%;
  }
`

const SlideshowGallery = ({ slides }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      const newCurrent = (current + 1) > (slides.length - 1) ? 0 : (current + 1)
      setCurrent(newCurrent)
    }, 2000)
    return () => clearTimeout(autoSlide)
  }, [current])

  return (
    <SlideshowGalleryWrapper>
      {
        slides.map((slide, index) => (
          <Slide key={index} show={current === index}>
            <div className="numbertext">{`${index + 1} / 6`}</div>
            <img src={slide.src} alt='smt'/>
            <div className="text">{slide.caption}</div>
          </Slide>
        ))
      }
    <PrevButton onClick={() => {
      const newCurrent = (current - 1) < 0 ? (slides.length - 1) : (current - 1)
      setCurrent(newCurrent)
    }}>&#10094;</PrevButton>
    <NextButton onClick={() => {
      const newCurrent = (current + 1) > (slides.length - 1) ? 0 : (current + 1)
      setCurrent(newCurrent)
    }}>&#10095;</NextButton>
    <div>
        {
          slides.map((slide, index) => (
            <Thumbnail key={index}>
              <img className="demo cursor" src={slide.src} onClick={() => setCurrent(index)} alt="The Woods"/>
            </Thumbnail>
          ))
        }
    </div>
</SlideshowGalleryWrapper>
  )
}

export default SlideshowGallery