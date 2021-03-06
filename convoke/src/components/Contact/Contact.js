import React, { Component, Fragment } from 'react';
import './Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <Fragment>
        <div className="contacts_container">
          <div className="contacts_box">
            <h1>Come say hi!</h1>

            <p>
              Thank you for visiting our site!

            </p>
            <p>
              We continue to improve and expand to daily to ensure we reach everyone we can.
                We have made it our top priority to ensure the best user experience while using our site. Do you have any input? Feel free to tell us your idea!
            </p>
            <div className='email_text'>
              <p>
                Any issues? Send us an email at{' '}
                <a className="contacts_email" href="mailto:fakeEmail@gmail.com">
                  convoke.meet@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
