import authTypes from "./auth.types"

const initalState = {
    user:null,
    userNameError:null,
    phoneError:null
}


export default (state=initalState,action) =>{
    switch(action.type){
        case authTypes.REGISTER_USER:{
            return{
                ...state,
                user:action.user,
                userNameError:null,
                phoneError:null
            }
        }
        case authTypes.LOGIN_USER:{
            return{
                ...state,
                user:action.user,
                userNameError:null,
                phoneError:null
            }
        }
        case authTypes.LOGOUT_USER:{
            return{
                ...state,
                user:null,
                userNameError:null,
                phoneError:null
            }
        }
        case authTypes.SET_ERROR_PHONE:{
            return{
                ...state,
                phoneError:action.phone
            }
        }
        case authTypes.SET_ERROR_USERNAME:{
            return{
                ...state,
                userNameError:action.userName
            }
        }
        default:
            return state
    }

}