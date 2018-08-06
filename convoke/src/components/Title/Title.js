import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

export default class Title extends Component {
  render() {

    return (
      <div className="titlepage_main">
        <Link to="/">
          <img
            className="fake_logo"
            src="https://i.pinimg.com/originals/11/da/6a/11da6aa25da4eff91e2674eb721fe360.png"
            alt="fake logo"
          />
        </Link>
          <h1 className='title_text'>A Place to Meet</h1>
      </div>
    );
  }
}

