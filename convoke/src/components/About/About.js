import React, { Component, Fragment } from 'react';
import './About.css';

export default class About extends Component {
  render() {
    return (
      <Fragment>
        <div className="about_container">
          <div className="about_box">
            <h1>About Convoke</h1>
            <p>
              Convoke is a place to bring real people together with a common
              purpose. <br/>Create events, join communities, and connect with
              individuals all in one site!
            </p>
          </div>
          <div className="about_box">
            <h1>Our Mission</h1>
            <p>Our mission is to seek out to anyone in need by allowing them to opportunity to stay connected to other people with like interests. We continue to improve and expand to daily to ensure we reach everyone we can.</p>
          </div>
        </div>
      </Fragment>
    );
  }
}
