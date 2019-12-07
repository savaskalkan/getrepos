import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Rooter from "./rooter";
import InternetConnectivity from "./components/utils/internetConnectivity";


class Main extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <InternetConnectivity />
        <Rooter />
      </Provider>
    );
  }
}

export default Main;