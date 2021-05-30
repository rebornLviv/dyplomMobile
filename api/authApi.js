import { axios } from "../utils/axios"

export const registerUser = async (body) => {
    try {
            console.log('regg tr',body)
            const postBod = await axios.post('/auth/sign-up',body)
            console.log('reg body',{postBod})
            return postBod
    } catch (error) {
        console.log('failed to regg',error)
    }
    
}

export const loginUser = async (body) =>  axios.post('/auth/sign-in',body)
export const checkValidity = async (mode,value) => { 
    console.log('checking phone',{axios:axios.defaults.baseURL},`/auth/check/${mode}/${value}`)
    return axios.get(`/auth/check/${mode}/${value}`)}
export const sendSms = async (phone) =>  axios.get(`/auth/send-sms/${phone}`)
export const validateSms = async (response) => axios.get(`/auth/validation/${response.deviceId}/${response.phone}/${response.code}`)