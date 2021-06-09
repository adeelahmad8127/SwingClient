import {StyleSheet, Platformt} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {color: '#fff', fontSize: 20, flex: 1},
  input: {
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 20,
    borderRadius: 5,
    paddingVertical: 5,
  },
  dropdownMain: {backgroundColor: '#fafafa', flex: 1},
  dropdownContainer: {height: 50, flex: 2},
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {backgroundColor: '#fafafa'},
  zIndex: {zIndex: -1},
  highlight: {
    backgroundColor: 'red',
    flex: 2,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  highlightText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
