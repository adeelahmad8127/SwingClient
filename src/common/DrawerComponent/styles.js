// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {Metrics} from '../../theme';
import Colors from '../../theme/Colors';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height / 4,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {height: width / 4, width: width / 4},
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
