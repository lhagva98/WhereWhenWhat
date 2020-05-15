import React from 'react';
import {View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Header from '../../components/Header';
const Map = ({route, navigation}) => {
  const {location} = route.params;
  return (
    <>
      <Header title="Байршил" backButton />
      <MapView
        showsMyLocationButton={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: location[0],
          longitude: location[1],
          latitudeDelta: 0.001922,
          longitudeDelta: 0.01421,
        }}>
        <Marker
          coordinate={{
            latitude: location[0],
            longitude: location[1],
          }}
        />
      </MapView>
    </>
  );
};

export default Map;
