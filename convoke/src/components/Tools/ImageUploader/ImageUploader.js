import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import './ImageUploader.css'

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwvrok1le/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ncjyrxth';

export default class ImageUploader extends Component {
  state = {
      image: ''
  }

  onImageDrop = files => {
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          image: response.body.secure_url
        });
        this.props.updateImg(response.body.secure_url);
      }
    });
  };

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.onImageDrop}
          multiple={false}
          accept="image/*"
          className="ce_image_dropzone"
        >
          <div>
            {this.state.image === '' ? (
              <p className="ce_dropzone_text">
                Drop an image or click to select a file to upload.
              </p>
            ) : (
              <div className='image_uploader_container'>
                <img
                  className="ep_upload_pic"
                  src={this.state.image}
                  alt="event pic"
                />
              </div>
            )}
          </div>
        </Dropzone>
      </div>
    );
  }
}