import React from 'react';
import { Switch, Route } from 'react-router-dom';

import About from './components/About/About';
import Calendar from './components/Calendar/Calendar';
import Chat from './components/Chat/Chat';
import Contact from './components/Contact/Contact';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Events from './components/Events/Events';

export default (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/events/:title" component={Events} />
    <Route path='/editprofile' component={EditProfile}/>
    <Route path="/chat" component={Chat} />
    <Route path="/contact" component={Contact} />
    <Route path="/create" component={CreateEvent} />  
    <Route path="/profile" component={Profile} />
    <Route path="/Calendar" component={Calendar}/>
    <Route exact path="/" component={Home} />
    <Route path='*' render={()=> <h1>404</h1>}/>
  </Switch>
);