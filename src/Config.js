import {Platform} from 'react-native';
export default {
  isAndroid: Platform.OS === 'android',
  logGeneral: true,
  logNetworkErrors: true,
};
