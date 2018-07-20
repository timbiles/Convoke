import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

// import './Header.css';

export default class Header extends Component {
    render(){
        return(
            <Fragment>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/chat'>Chat</Link>
                <Link to='/contact'>Contact</Link>
                <Link to='/create'>CreateEvent</Link>
                <Link to='/login'>Login</Link>
                <Link to='/profile'>Profile</Link>                
            </Fragment>
        )
    }
}