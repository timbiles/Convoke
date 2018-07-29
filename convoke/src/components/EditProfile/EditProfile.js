import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './EditProfile.css';

import {
  getEventsAttending,
  updateName,
  updateEmail,
  updateHomeTown,
  updateImg,
  updateBio,
  reset,
  updateUserInfo
} from '../../ducks/userReducer';

class EditProfile extends Component {
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);
  }
  handleSubmit = id => {
    let { name, email, home_town, img, bio, auth_id } = this.props.user;
    this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      let { name, email, home_town, img, bio, auth_id } = this.props.user;
      this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
    }
  };

  render() {
    const { auth_id, name, email, home_town, img, bio } = this.props.user;
    const {
      updateName,
      updateEmail,
      updateHomeTown,
      // updateImg,
      updateBio
    } = this.props;

    return (
      <div className="mc_container">
        <div className="mc_title">{/* <h1>MyConvoke Page</h1> */}</div>
        <div className="mc_display">
          {!auth_id.length ? (
            <div>
              <h2>Oops! Don't forget to Login!</h2>
              <a className="mc_link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="mc_login_btn">Login</h1>
              </a>
            </div>
          ) : (
            <div>
              <div>
                <input
                  className="update_profile_name"
                  value={name}
                  type="text"
                  onChange={e => updateName(e.target.value)}
                  onKeyDown={this.handleKeyDown}
                />
                <div className="img-email-edit">
                  <img
                    className="profile_display_img"
                    src={img}
                    alt={auth_id}
                  />
                  <div className="email_and_img_edit">
                    <h3>Email</h3>
                    <input
                      className="update_profile_email"
                      value={email}
                      type="text"
                      onChange={e => updateEmail(e.target.value)}
                    />
                    <h3>Home Town</h3>
                    <input
                      className="update_profile_home_town"
                      value={home_town}
                      type="text"
                      onChange={e => updateHomeTown(e.target.value)}
                    />
                  </div>
                </div>
                <h3>Bio</h3>
                <textarea
                  className="update_profile_bio"
                  value={bio}
                  type="text"
                  onChange={e => updateBio(e.target.value)}
                />
                <div>
                  <Link to="/profile">
                    <button
                      onKeyDown={this.handleKeyDown}
                      className='ep_submit_btn'
                      onClick={id => this.handleSubmit(id)}
                    >
                      Submit Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mc_events_display">
          {this.props.user.eventsAttending.map((e, i) => {
            return (
              <div className="mc_events_cards" key={e.id}>
                <div className="mc_name_and_img">
                  <h1>{e.title}</h1>
                  <img className="mc_events_img" src={e.img} alt={e.title} />
                </div>
                <p>{e.host}</p>
                <p>
                  {e.date.substring(5, 10).replace(/-/g, '/')}/{e.date.substring(
                    0,
                    4
                  )}
                </p>
                <p>
                  {e.time[0] === '0'
                    ? e.time.substring(1, 5)
                    : e.time.substring(0, 5)}
                </p>
                <p>{e.location.substring(0, e.location.length - 5)}</p>
                <button
                  onClick={id => {
                    this.handleDelete(e.events_id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getEventsAttending,
    updateName,
    updateEmail,
    updateHomeTown,
    updateImg,
    updateBio,
    reset,
    updateUserInfo
  }
)(EditProfile);

//     return (
//       <div className="ep_container">
//         <div className="ep_box_container">
//           {!auth_id.length ? (
//             <div>
//               <h1>Don't forget to Login!</h1>
//               <a className="" href={process.env.REACT_APP_LOGIN}>
//                 <h1 className="">Login</h1>
//               </a>
//             </div>
//           ) : (
//             <div className="ep_input">
//               <h1>Update Name</h1>
//               <input
//                 className="update_profile_name"
//                 value={name}
//                 type="text"
//                 onChange={e => updateName(e.target.value)}
//                 onKeyDown={this.handleKeyDown}
//               />
//               <h1>Update Email</h1>
//               <input
//                 className="update_profile_email"
//                 value={email}
//                 type="text"
//                 onChange={e => updateEmail(e.target.value)}
//               />
//               <h1>Update Home Town</h1>
//               <input
//                 className="update_profile_home_town"
//                 value={home_town}
//                 type="text"
//                 onChange={e => updateHomeTown(e.target.value)}
//               />
//               <h1>Update Image</h1>
//               <input
//                 className="update_profile_Img"
//                 placeholder="Update Image"
//                 type="text"
//                 onChange={e => updateImg(e.target.value)}
//               />
//               <h1>Update Bio</h1>
//               <input
//                 className="update_profile_bio"
//                 value={bio}
//                 type="text"
//                 onChange={e => updateBio(e.target.value)}
//               />
//               <Link to="/profile">
//                 <button
//                   onKeyDown={this.handleKeyDown}
//                   onClick={id => this.handleSubmit(id)}
//                 >
//                   Submit Edit
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
