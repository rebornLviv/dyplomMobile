import {axios} from '../utils/axios';

export const registerUser = async (body) => axios.post('/auth/sign-up', body);
export const loginUser = async (body) => axios.post('/auth/sign-in', body);
export const checkValidity = async (mode, value) =>
  axios.get(`/auth/check/${mode}/${value}`);
export const sendSms = async (phone) => axios.get(`/auth/send-sms/${phone}`);
export const validateSms = async (response) =>
  axios.get(
    `/auth/validation/${response.deviceId}/${response.phone}/${response.code}`,
  );
