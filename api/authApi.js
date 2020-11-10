import { axios } from "../utils/axios"

export const login = (username,password) => {
    return  axios.post('/auth/sign-in',{username,password})
}

export const register = (username,password,phone) => {
    return  axios.post('/auth/sign-up',{username,password,phone})
}


export const isNameFree = (username) => {
    return axios.get(`auth/check/username/${username}`)
}
export const isPhoneFree = (phone) => {
    return axios.get(`auth/check/phone/${phone}`)
}