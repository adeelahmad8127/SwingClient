// @flow
import {StyleSheet, Platform} from 'react-native';

import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  currencyContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    marginBottom: 10,
  },
  signalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  signalPlaceholder: {color: '#fff', fontSize: 20},
  signalStatusContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
  },
  signalStatusText: {color: '#fff', fontWeight: 'bold', fontSize: 20},
  divider: {height: 1, backgroundColor: '#fff', marginBottom: 10},
  statusContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusValue: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  statusPlaceholder: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
  },
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
});
