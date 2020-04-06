import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {NetworkProvider} from 'react-native-offline';
import RootStack from './Routes';
import store from './store';
import chest from '../src/api/chest';
import unfetch from 'unfetch';
import AppToast from '../src/components/AppToast';
chest.set({
  fetch: unfetch,
});
class App extends Component {
  onToastRef = (ref) => (this.toast = ref);
  showToast = (message) => this.toast.show(message, 2000);
  componentDidMount() {
    chest.set({
      toast: this.showToast,
    });
  }
  render() {
    return (
      <Provider store={store}>
        <NetworkProvider>
          <View style={{flex: 1}}>
            <RootStack />
            <AppToast refProp={this.onToastRef} />
          </View>
        </NetworkProvider>
      </Provider>
    );
  }
}

export default App;
