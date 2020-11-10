import BaseAxios from 'axios';

export const axios = BaseAxios.create();
axios.defaults.baseURL = 'https://helper-z.herokuapp.com/api/v1';
export const setAccessToken = (type = 'Bearer', token) => {
  axios.defaults.headers.common.Authorization = `${type} ${token}`;
};

export const resetAccessToken = () => {
  axios.defaults.headers.common.Authorization = '';
};