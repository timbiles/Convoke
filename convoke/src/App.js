import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

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
            <div
              className="scroll_to_top"
              onClick={() => {
                window.scroll({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
