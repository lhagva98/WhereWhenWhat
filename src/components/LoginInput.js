import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, View} from 'react-native';
import AppText from './common/AppText';
import {getFontStyleObject} from '../utils/font';
import Theme from '../Theme';
import Config from '../Config';

class LoginInput extends React.PureComponent {
  state = {focused: false};

  onFocus = () => {
    const {onFocus} = this.props;
    this.setState({focused: true});
    onFocus && onFocus();
  };

  onBlur = () => {
    const {onBlur} = this.props;
    this.setState({focused: false});
    onBlur && onBlur();
  };

  render() {
    const {error, inputStyle, label, style, subtext, ...props} = this.props;
    const {focused} = this.state;
    return (
      <View style={[styles.container, style]}>
        {label && <AppText style={styles.label}>{label}</AppText>}
        <View
          style={[
            styles.inputContainer,
            focused && styles.inputContainerFocused,
            error && styles.inputContainerError,
          ]}>
          {/* <View style={styles.icon}>{this.props.Icon}</View> */}
          <TextInput
            selectionColor={Theme.colors.textInputSelection}
            autoCorrect={false}
            autoCapitalize="none"
            {...props}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            style={[styles.input, inputStyle]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: Theme.spacing.tiny,
  },
  label: {
    ...getFontStyleObject({weight: 'Bold'}),
    marginBottom: Theme.spacing.tiny,
  },
  inputContainer: {
    borderRadius: 4,
    backgroundColor: 'rgba(250,250,250,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFocused: {
    backgroundColor: 'rgba(250,250,250,0.65)',
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: Theme.colors.danger,
  },
  input: {
    marginHorizontal: Theme.spacing.tiny,
    paddingVertical: Config.isAndroid ? 0 : 10,
    color: '#ffffff',
    ...Theme.typography.input,
    ...getFontStyleObject(),
    height: 40,
  },
  subtext: {
    margin: Theme.spacing.xTiny,
  },
  icon: {
    padding: 5,
  },
});

LoginInput.propTypes = {
  error: PropTypes.bool,
  inputStyle: PropTypes.any,
  label: PropTypes.string,
  style: PropTypes.any,
  subtext: PropTypes.string,
  Icon: PropTypes.object,
};

export default LoginInput;
