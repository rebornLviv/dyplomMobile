import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/auth.reducer'
import statisticsReducer from "./statistics/statistics.reducer";
import subjectTestsReducer from "./subjetTests/subjectTests.reducer";
import testReducer from "./test/test.reducer";


export default combineReducers({
    auth: authReducer,
    subjectTest: subjectTestsReducer,
    test: testReducer,
    stats: statisticsReducer
})