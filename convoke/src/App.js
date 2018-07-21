import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
// import './reset.css';

import routes from './routes';
import store from './ducks/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Title />
            <Header />
            {routes}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
