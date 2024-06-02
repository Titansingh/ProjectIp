import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
      throw error; // Propagate the error to handle it where it's used
    }
  };

  const getData = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      throw error;
    }
  };

  const storeObjectData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing object data for key ${key}:`, error);
      throw error;
    }
  };

  const getObjectData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving object data for key ${key}:`, error);
      throw error;
    }
  };

  return {storeData, getData, storeObjectData, getObjectData};
};

export default useAsyncStorage;
