import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Title.css';

export default class Title extends Component {
  render() {
    // console.log("title rendered")

    return (
      <div className="titlepage_main">
        <Link to="/">
          <img
            className="fake_logo"
            src="https://i.pinimg.com/originals/11/da/6a/11da6aa25da4eff91e2674eb721fe360.png"
            alt="fake logo"
          />
        </Link>
      </div>
    );
  }
}

// https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg
