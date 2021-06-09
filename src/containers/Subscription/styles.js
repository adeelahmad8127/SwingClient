// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {Metrics} from '../../theme';
import Colors from '../../theme/Colors';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {height: width / 3, width: width / 3, marginBottom: 10},
  subscribeBtnContainer: {
    flexDirection: 'row',
    // backgroundColor: '#3399cc',
    backgroundColor: Colors.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subscribe: {height: 40, width: 40},
  subscribeText: {
    fontSize: 25,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  details: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
  },
});
