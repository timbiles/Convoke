import React, { Component, Fragment } from 'react';
import './Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <Fragment>
        <div className='contacts_container'>
          <h1>Contact</h1>
          <div className='contacts_box'>
            <p>Thank you for visiting our site! <br />
                If you run into any issues, feel free to let us know! <br />
                We will resolve any issue as soon as possible.
            
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}
