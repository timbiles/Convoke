import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Title.css';

export default class Title extends Component {
  render() {
    return (
      <div className="titlepage_main">
      <Link to='/'>
        <img
          className="fake_logo"
          src="https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg"
          alt="fake logo"
        />
      </Link>
      </div>
    );
  }
}
