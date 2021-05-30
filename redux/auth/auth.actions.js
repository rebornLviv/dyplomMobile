import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkValidity, loginUser, registerUser, sendSms, validateSms } from "../../api/authApi";


export const register = createAsyncThunk('register', (data) =>  {
    try {
        console.log('try register',data)
        return registerUser(data)    
    } catch (error) {
        console.log('error registering',error)
    }
    
})

export const login = createAsyncThunk(
    'login',
   async (data) => {
        try {
            const logres = await loginUser(data)
            console.log('data to log in res',logres)

            return  logres
        }catch (e) {
            console.log('error loggin user in ',e)
            throw new Error(e)
        }

    }
)

export const checkEmail = createAsyncThunk('checkEmail',
    (email) => checkValidity('email',email)
)
export const checkPhone = createAsyncThunk('checkPhone', (phone) => {
        return checkValidity('phone',phone)
    }
)

export const checkUsername = createAsyncThunk('checkUsername',
    (username) => checkValidity('username', username)
)

export const sendSmsToPhone = createAsyncThunk('getSms',
   async (phone) =>await  sendSms(phone.replace(/[-\s.,$_)(]/g, '').toString().substring(1))
)

export const validateCode = createAsyncThunk('validateCode',
    (response) => validateSms(response)
)


























// import AsyncStorage from "@react-native-community/async-storage"
// import { isNameFree, isPhoneFree, login, register } from "../../api/authApi"
// import { resetAccessToken, setAccessToken } from "../../utils/axios"
// import authTypes from "./auth.types"

// export const registerUser = (username,phone,password) => {
//     return async (dispatch,getState) => {
//         try {
//           let phoneError = await getState().auth.phoneError 
//           let userNameError = await  getState().auth.userNameError 
//           console.log('phoneError',phoneError)
//           console.log('unameError',userNameError)
//           if(phoneError){
//               alert('Phone is alreay in use')
//               return
//           }
//           if(userNameError){
//               alert('Name is already in use')
//               return
//           }

//           let user =   await register(username,password,phone)
//            console.log('Register response',user)
//             await   AsyncStorage.setItem('user',JSON.stringify(user))
//             dispatch({
//                 type:authTypes.REGISTER_USER,
//                 user
//             })
//             setAccessToken('Bearer',user.token)
//         } catch (error) {
//             console.log('Error  registering user',error)
//         }
//     }
// }

// export const loginUser = (username,password) => {
//     return async dispatch => {
//         try {
//             let user = await login(username,password)
//             console.log('Login Result',user)
//             setAccessToken('Bearer',user.token)
//             await   AsyncStorage.setItem('user',JSON.stringify(user))
//             dispatch({
//                 type:authTypes.LOGIN_USER,
//                 user
//             })
//         } catch (error) {
//             console.log('Error  logging user in',error)
//         }
//     }
// }

// export const logoutUser = () => {
//     return async dispatch =>{
//         try {
//             await AsyncStorage.removeItem('user')
//             resetAccessToken()
//             dispatch({
//                 type:authTypes.LOGOUT_USER
//             })
//         } catch (error) {
//             console.log('Error loggin user out',error)
//         }     
//     }
   
// }

// export const autoLogin = (user) => {
//     return async dispatch =>{
//         console.log('autoUser',user)
//         setAccessToken('Bearer',user.token)
//         dispatch({type:authTypes.LOGIN_USER,
//         user})
//     }
// }

// export const checkUserName = (username) => {
//     return async dispatch => {
//         try {
//             let isFree = await isNameFree(username)
//             console.log('isFreeName',isFree)    
//             dispatch({
//                 type:authTypes.SET_ERROR_USERNAME,
//                 userName:!isFree.data.valid
//             })
//         } catch (error) {
//             console.log('error checking name for avaliability',error)
//         }
        
//     }
// }

// export const checkPhone = (phone) => {
//     return async dispatch => {
//         try {
//             let isFree = await isPhoneFree(phone)
//             console.log('isFreeName',isFree)    
//             dispatch({
//                 type:authTypes.SET_ERROR_PHONE,
//                 phone: !isFree.data.valid
//             })
//         } catch (error) {
//             console.log('error checking name for avaliability',error)
//         }
        
//     }
//     }


