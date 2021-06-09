// import {StyleSheet} from 'react-native';

// export default StyleSheet.create({
//   dateContainer: {
//     paddingVertical: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   dateText: {color: 'white', fontSize: 20, flex: 2},
//   divider: {height: 2, backgroundColor: '#fff'},
//   typeContainer: {
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   typeText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

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
