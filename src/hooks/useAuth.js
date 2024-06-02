import useAsyncStorage from './useAsyncStorage';

const useAuth = async () => {
  const [storeData, getData, storeObjectData, getObjectData] =
    useAsyncStorage();
  const token = await getData('auth');
  if (token) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
