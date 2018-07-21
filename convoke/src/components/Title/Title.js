import React, { Component } from 'react';
import './Title.css';

export default class Title extends Component {
  render() {
    return (
      <div className="titlepage_main">
        <img
          className="fake_logo"
          src="https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
          alt="fake logo"
        />
      </div>
    );
  }
}
