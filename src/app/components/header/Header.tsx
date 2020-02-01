import React from 'react'
import HeaderNav from './HeaderNav'

require('./Header.css')

interface Props {
}

const Header: React.FC<Props> = () =>
  <header className="Header">
    <h1 className="Header-title">
      MHW:ICEBORNE Skill Simulator
    </h1>
    <HeaderNav />
  </header>

export default Header
