// @flow
import {Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

function setEnable(enable: boolean = true) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(enable);
    KeyboardManager.setToolbarPreviousNextButtonEnable(enable);
    KeyboardManager.setEnableAutoToolbar(enable);
  }
}

function setToolbarPreviousNextButtonEnable(enable: boolean = true) {
  if (Platform.OS === 'ios') {
    KeyboardManager.setToolbarPreviousNextButtonEnable(enable);
    KeyboardManager.setEnableAutoToolbar(enable);
  }
}

export default {
  setEnable,
  setToolbarPreviousNextButtonEnable,
};
