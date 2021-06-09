import {StyleSheet, Platform, StatusBar} from 'react-native';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  container: {
    height: Platform.OS === 'android' ? 60 : 56,
    marginTop: Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'row',
    zIndex: 1,
    alignItems: 'center',
    backgroundColor: Colors.green,
  },
  iconContainer: {padding: 15},
  icon: {width: 20, height: 20, tintColor: '#fff'},
  title: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
});
