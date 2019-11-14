import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  from {
    opacity: 0.4;
  }

  to {
    opacity: 1;
  }
`

const Wrapper = styled.div``

const SliderWrapper = styled.div`
  max-width: 1000px;
  position: relative;
  margin: auto;
`

const Slide = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  animation: ${fade} 1.5s linear;
  img {
    width: 100%;
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

const Dot = styled.div`
  text-align: center;

  .dot {
    cursor: pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;

    &:hover {
      background-color: #717171;
    }
  }
  .active {
    background-color: #717171;
  }
`

export const PrevButton = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;

  &:hover {
    background-color: rgba(0,0,0,0.8);
  }
`

export const NextButton = styled(PrevButton)`
  right: 0;
  border-radius: 3px 0 0 3px;
`

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const autoSlide = setTimeout(() => {
      const newCurrent = (current + 1) > (slides.length - 1) ? 0 : (current + 1)
      setCurrent(newCurrent)
    }, 2000)
    return () => clearTimeout(autoSlide)
  }, [current, slides.length])

  return (
    <Wrapper>
      <SliderWrapper>
      {
        slides.map((slide, index) => (
          <Slide key={index} show={current === index}>
            <div className="numbertext">{`${index + 1} / 3`}</div>
            <img src={slide.src} alt='something'/>
            <div className="text">{slide.caption}</div>
          </Slide>
        ))
      }
      <PrevButton
        onClick={() => {
          const newCurrent = (current - 1) < 0 ? (slides.length - 1) : (current - 1)
          setCurrent(newCurrent)
        }}
      >&#10094;</PrevButton>
      <NextButton
        onClick={() => {
          const newCurrent = (current + 1) > (slides.length - 1) ? 0 : (current + 1)
          setCurrent(newCurrent)
        }}
      >&#10095;</NextButton>
    </SliderWrapper>
    <Dot>
      {
        slides.map((slide, index) => (
          <span key={index} className={`dot ${current === index ? 'active' : ''}`} onClick={() => setCurrent(index)}></span>
        ))
      }
    </Dot>
    </Wrapper>
  )
}

export default Slider