import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CustomLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 2px 1px 1px 16px;
`

const Menus = () => (
  <div style={{ width: 200, flex: 1 }}>
    <div style={{ height: '100%', width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
      <CustomLink to="/slideshow">Slideshow</CustomLink>
      <CustomLink to="/slideshow-gallery">Slideshow Gallery</CustomLink>
      <CustomLink to="/modal-images">Modal Images</CustomLink>
    </div>
  </div>
)

export default Menus