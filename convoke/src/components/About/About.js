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
              purpose. Create events, join communities, and connect with
              individuals all in one site! Our mission is to seek out anyone in need, allowing them to opportunity to stay connected to other people with like interests. 
            </p>
          </div>
          <div className="about_box">
            <h1>Skills Utilized</h1>
            <p>
              JavaScript | Node | Express | MassiveJS | Auth0 | PostgresSQL | React | Redux | Google Maps | Socket.IO | Nodemailer | Open Weather Map 
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}