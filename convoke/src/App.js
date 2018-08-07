import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import './App.css';

import routes from './routes';
import store from './ducks/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';

class App extends Component {
  componentDidMount() {
    axios.delete('/api/deleteOldevent');
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='site'>
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
