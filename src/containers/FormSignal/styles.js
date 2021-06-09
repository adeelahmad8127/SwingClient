import {StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  divider: {height: 2, backgroundColor: '#fff', marginBottom: 10},

  status: {zIndex: 1},
  signal: {zIndex: 2},
  pairs: {zIndex: 3},
  pairsContainer: {marginBottom: 50},
  btnTopContainer: {alignSelf: 'flex-end', marginTop: 50},
  btnContainer: {
    backgroundColor: '#66CC33',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 20,
    borderRadius: 5,
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
