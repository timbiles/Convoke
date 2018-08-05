import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="footer_container">
          <div>
            <Fade bottom>
              <a href="http://www.twitter.com/" target="blank">
                <img
                  className="twitter footer_icon"
                  src="https://seeklogo.com/images/T/twitter-2012-negative-logo-5C6C1F1521-seeklogo.com.png"
                  alt="Twitter logo"
                />
              </a>
            </Fade>
            <Fade bottom>
              <a href="https://www.linkedin.com/" target="blank">
                <img
                  className="linkedin footer_icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/2000px-Linkedin.svg.png"
                  alt="Linkedin logo"
                />
              </a>
            </Fade>
            <Fade bottom>
              <a href="http://www.facebook.com/" target="blank">
                <img
                  className="facebook footer_icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
                  alt="Facebook logo"
                />
              </a>
            </Fade>
          </div>
          <div className="footer_link_container">
            <Link
              onClick={() => {
                window.scroll({ top: 1000, behavior: 'smooth' });
              }}
              className="footer_link"
              to="/about"
            >
              About
            </Link>
            <Link
              onClick={() => {
                window.scroll({ top: 1000, behavior: 'smooth' });
              }}
              className="footer_link"
              to="/contact"
            >
              Contact
            </Link>
          </div>
          <div>
            <p className="copyright">© Olive Branch Designs</p>
          </div>
        </div>
      </Fragment>
    );
  }
}
