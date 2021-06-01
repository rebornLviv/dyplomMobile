import { axios } from "../utils/axios";

export const getUserData = () => axios.get('/user/current')
export const changeUserData = (data) => axios.put('/user', data)