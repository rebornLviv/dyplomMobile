import { createAction, createReducer } from "@reduxjs/toolkit";
import { checkEmail, getUserProfile, login, register, sendSmsToPhone } from "./auth.actions";

const initialState = {
    email: '',
    id: 0,
    roles: [],
    phone: '',
    token: '',
    username: '',
    avatar: null,
    error: null,
    loading: false
}


export const defaultError = 'Something went wrong!'
export const logoutUser = createAction('logout')

export default createReducer(initialState, builder =>
    builder.addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
    })
        .addCase(register.fulfilled, (state, action) => {
            // state = { ...action.payload, ...state }
            console.log('reg response', { reg: action.payload })
            const { token, id, email, username, roles, phone } = action.payload
            state.loading = false
            state.error = null
            state.token = token
            state.username = username
            state.id = id
            state.email = email
            state.roles = roles
            state.phone = phone
        })
        .addCase(register.rejected, (state, { error }) => {
            state.loading = false
            state.error = error.message ?? defaultError
        })
        .addCase(login.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(login.fulfilled, (state, action) => {
            // state = { ...action.payload, ...state }
            const { token, id, email, username, roles, phone } = action.payload
            state.loading = false
            state.error = null
            state.token = token
            state.username = username
            state.id = id
            state.email = email
            state.roles = roles
            state.phone = phone
        })
        .addCase(login.rejected, (state, { error }) => {
            state.loading = false
            state.error = error.message ?? defaultError
        })
        .addCase(sendSmsToPhone.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(sendSmsToPhone.rejected, (state, { error }) => {
            state.loading = false
            state.error = error.message ?? defaultError
        })
        .addCase(getUserProfile.fulfilled, (state, { payload }) => {
            const { email, avatar, username } = payload
            state.avatar = avatar
            state.email = email
            state.username = username
        })

        .addCase(logoutUser, state => {
            state.email = ''
            state.error = null
            state.id = 0
            state.token = ''
            state.roles = []
            state.phone = ''
            state.loading = false
        })
)