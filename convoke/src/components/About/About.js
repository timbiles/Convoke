import React, { Component, Fragment } from 'react';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <Fragment>
        <div className='about_container'>
          <div className='about_box'>
              <h1>About Convoke</h1>
              <p>Convoke is a site to bring real people together with a common purpose.</p>
          </div>
        </div>
      </Fragment>
    );
  }
}
