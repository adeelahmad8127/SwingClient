import {
  Text,
  YellowBox,
  TextInput,
  StatusBar,
  LogBox,
  Platform,
} from 'react-native';

import {
  yellowBox,
  allowTextFontScaling,
  allowIQKeyboardManager,
  allowIQKeyboardManagerToolbar,
} from '../config/AppConfig';

import {IQKeyboardManager} from '.';

export default () => {
  if (__DEV__) {
    //  eslint-disable-next-line no-console
    console.disableYellowBox = yellowBox;
    LogBox.ignoreAllLogs(true);
    YellowBox.ignoreWarnings([
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: componentWillUpdate is deprecated',
      'Warning: componentWillMount is deprecated',
    ]);
  }

  if (Platform.OS === 'ios') {
    // Allow IQKeyboardManager
    IQKeyboardManager.setEnable(allowIQKeyboardManager);

    // Allow Button IQKeyboardManager
    IQKeyboardManager.setToolbarPreviousNextButtonEnable(
      allowIQKeyboardManagerToolbar,
    );
  }

  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
  }

  // Allow/disallow font-scaling in app
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = allowTextFontScaling;
};
