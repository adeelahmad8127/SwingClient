import {StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  divider: {height: 2, backgroundColor: '#fff', marginBottom: 10},

  status: {zIndex: 1},
  signal: {zIndex: 2},
  pairs: {zIndex: 3},
  pairsContainer: {marginBottom: 50},
  btnContainer: {
    backgroundColor: '#66CC33',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#66CC33',
    paddingVertical: 10,
    marginTop: 2,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
});
