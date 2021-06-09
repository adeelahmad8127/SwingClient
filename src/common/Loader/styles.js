// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {Metrics} from '../../theme';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  loadingMessage: {
    marginBottom: 16,
  },
  modal: {
    margin: 0,
  },
});
