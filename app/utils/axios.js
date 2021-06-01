import BaseAxios from 'axios';
import jwtDecode from 'jwt-decode';
import {BASE_URL, BASE_TEST_URL} from '../api/config';

export const axios = BaseAxios.create({baseURL: BASE_URL});
export const testAPi = BaseAxios.create({baseURL: BASE_TEST_URL});
const whiteList = ['auth'];

const inWhiteList = (url) => {
  const match = whiteList.find((i) => url.includes(i));
  return !!match;
};

export const tokenValid = (token) => {
  if (!token) return false;
  try {
    const currentDate = new Date();
    const {exp} = jwtDecode(token);
    if (exp === undefined) return false;
    return !(exp * 1000 < currentDate.getTime());
  } catch (error) {
    return false;
  }
};

export const setAxiosInterceptors = (token, logout) => {
  axios.interceptors.request.use(
    async (request) => {
      if (token && !inWhiteList(request.url ?? '')) {
        const newRequest = {...request};
        newRequest.headers.Authorization = 'Bearer ' + token;
        return newRequest;
      }

      return request;
    },
    (error) => {
      console.log('got error in request ', error);
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      console.log('got response data ', response);
      return response?.data ?? response;
    },
    async (error) => {
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403) &&
        token
      ) {
        logout();
        return null;
      }
      console.log('got response data  err', error);
      return Promise.reject(error);
    },
  );
};

testAPi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // const { token } = store.getState().login
    if (
      error &&
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
      // && token
    ) {
      // eslint-disable-next-line no-void
      // void store.dispatch(doLogout())
      return null;
    }
    return Promise.reject(error);
  },
);
