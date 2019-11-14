import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const MyImg = styled.img`
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  max-width: 300px;

  &:hover {
    opacity: 0.7;
  }
`

const Modal = styled.div`
  display: ${(props => props.show ? 'block' : 'none')};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */

  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }
  .close:hover, .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
`

const ModalImage = ({ image }) => {
  const [imgSrc, setImgSrc] = useState('')

  return (
    <div>
      <MyImg
        src={image.src} alt="Snow"
        onClick={() => setImgSrc(image.src)}
      />

      <Modal show={!!imgSrc}>
        <span
          className="close"
          onClick={() => setImgSrc('')}
        >&times;</span>
        <img
          className="modal-content" id="img01" src={imgSrc} alt='smt'/>
        <div id="caption"></div>
      </Modal>
    </div>
  )
}

export default ModalImage
