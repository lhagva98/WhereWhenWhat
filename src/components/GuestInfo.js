import React from 'react';
import {View, StyleSheet} from 'react-native';
import InfoAbsoluteBlock from './InfoAbsoluteBlock';
import {getGuestInfoIcon} from '../utils/icons';

class GuestInfo extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <InfoAbsoluteBlock
          Icon={getGuestInfoIcon()}
          text="Та зочин эрхээр нэвтэрсэн байна"
          subtext=" "
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GuestInfo;
