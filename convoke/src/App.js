import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
// import './reset.css';

import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            {routes}
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
