import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Navigator from './Navigator';
import store from './store/config';

// AdMobInterstitial.setTestDeviceID('EMULATOR');
// AdMobInterstitial.setAdUnitID(AD_ID.INTERSTITIAL_OPENING);
class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default Root;
