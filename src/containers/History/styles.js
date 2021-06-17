import {StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../theme';
import { HP, WP } from '../../utils/Responsive';

export default StyleSheet.create({
  container: {backgroundColor: '#000', paddingHorizontal: 20,width : WP(100), height : HP(100)},
});
