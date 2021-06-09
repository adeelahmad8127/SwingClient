import {StyleSheet} from 'react-native';

import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  inputField: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 25,
    height: 60,
    paddingLeft: 15,
    borderRadius: 10,
  },
  btnContainer: {
    backgroundColor: '#66CC00',
    alignItems: 'center',
    marginHorizontal: 70,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createAcc: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  errorMessage: {
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    alignSelf: 'center',
    bottom: 50,
  },
  logoImg: {width: 150, height: 150},
  termsAndUse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
