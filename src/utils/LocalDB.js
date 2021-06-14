/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';



export const storeData = async (key, value) => {
  console.log('val', value)
  console.log('key', key)
  try {
    var jsonValue
    if (value != null) {
      jsonValue = JSON.stringify(value)
    }
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    // console.log(e)
  }
}


export const getData = async (key) => {
  let item = {};
  try {
    item = await AsyncStorage.getItem(key) || null;

    const keys = await AsyncStorage.getAllKeys();
    return item;
  }
  catch (error) {

  }
}


export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key) || null;

    return true;
  }
  catch (error) {
  }
  return false;
}