import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  pairText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: '#336699',
  },
  statusContainer: {flex: 1, alignItems: 'center'},
  statusText: {fontSize: 15, fontWeight: 'bold'},
  statusText2: {fontSize: 15, fontWeight: 'bold', marginTop: 3, color: 'red'},
  buySellContainer: {flexDirection: 'row', alignItems: 'center'},
  buysellText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
    paddingLeft: 40,
    color: 'red',
  },
  rightArrow: {height: 10, width: 10},
});
