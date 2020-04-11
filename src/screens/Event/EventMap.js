import React from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const Map = () => {
  return <MapView provider={PROVIDER_GOOGLE} style={{flex: 1}} />;
};

export default Map;
