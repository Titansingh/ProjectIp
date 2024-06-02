import axios from 'axios';
import {useState, useEffect} from 'react';
import useAuthStore from '../../store/authZustand';

const useAxios = (
  axiosInstance,
  {url, baseURL = null, params = {}, headers = {}, isLazy = false},
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authToken = useAuthStore(state => state.authState.tokens.auth);

  // const axiosInstance = axios.create({
  //   baseURL: 'https://dummyapi.online',
  // });

  // axiosInstance.interceptors.request.use(
  //   config => {
  //     if (authToken) {
  //       config.headers.Authorization = `Bearer ${authToken}`;
  //     }
  //     config.headers = {...config.headers, ...headers};
  //     return config;
  //   },
  //   axiosError => {
  //     console.error('Request interceptor error:', axiosError);
  //     return Promise.reject(axiosError);
  //   },
  // );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    return () => {
      cancelTokenSource.cancel('Component unmounted: Request cancelled.');
      console.log('Request cancelled due to component unmounting.');
    };
  }, []);

  const commonRequest = async (method, data = {}, params2 = {}) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        params: {...params, ...params2},
        data,
        cancelToken: axios.CancelToken.source().token,
      });

      setResponse(result.data);

      return result;
    } catch (axiosError) {
      if (axios.isCancel(axiosError)) {
        console.log('Request cancelled:', axiosError.message);
      } else {
        setError(axiosError?.response?.data ?? axiosError.message);
        console.error('Request error:', axiosError);
      }
      return axiosError;
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (params2 = {}) =>
    commonRequest('GET', undefined, params2);
  const sendData = async (data = {}) => commonRequest('POST', data);
  const patchData = async (data = {}) => commonRequest('PATCH', data);
  const deleteData = async (params2 = {}) =>
    commonRequest('DELETE', undefined, params2);

  // Initial data fetching
  useEffect(() => {
    if (!isLazy) {
      fetchData();
      sendData();
    }
  }, [isLazy]);

  return {response, error, loading, fetchData, sendData, patchData, deleteData};
};

export default useAxios;
