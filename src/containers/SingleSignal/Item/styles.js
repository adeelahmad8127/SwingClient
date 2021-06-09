import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  dateContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {color: 'white', fontSize: 20},
  divider: {height: 2, backgroundColor: '#fff'},
  typeContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
