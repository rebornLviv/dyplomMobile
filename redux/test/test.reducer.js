import { createReducer } from "@reduxjs/toolkit";
import { mapLettersToTests } from "../../utils/helpers";
import { setTest } from "./test.actions";

const initialState = {
    test: {},
}

export default createReducer(initialState, builder =>
    builder.addCase(
        setTest, (state, { payload }) => {
            let testsTransformed = { ...payload }
            testsTransformed.tests = mapLettersToTests(testsTransformed.tests)
            state.test = testsTransformed
            console.log('transformedTests', testsTransformed)
        }
    )

)
