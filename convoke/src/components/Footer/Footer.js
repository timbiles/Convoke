import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="footer_container">
          <a href="http://www.twitter.com/" target="blank">
            <img
              className="twitter_icon"
              src="data:image/png;base64,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"
              alt="Twitter logo"
            />
          </a>
          <a href="https://www.linkedin.com/" target="blank">
            <img
              className="twitter_icon"
              src="http://1000logos.net/wp-content/uploads/2017/03/Logo-LinkedIn.jpg"
              alt="Linkedin logo"
            />
          </a>
          <Link to="/contact">Contact</Link>          
          <p className="copyright">© Olive Branch Designs</p>
        </div>
      </Fragment>
    );
  }
}
