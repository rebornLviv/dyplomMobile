import  {applyMiddleware, createStore} from 'redux'
import rootReducer from './root-reducer'
import reduxThunk from 'redux-thunk'
export default createStore(rootReducer,applyMiddleware(reduxThunk))