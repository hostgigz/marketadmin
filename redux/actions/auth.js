import { RESTORE_AUTH_STATE, AUTHENTICATE, DEAUTHENTICATE } from '../types/auth';
import axios from 'axios';
import { API } from '../../config';
import { setCookie } from "../../utils/cookie";
import Router from 'next/router';
// login
export const login = ({ email, password } , type ) => {
    if( type !== "signin" && type !== "signup" ){
        throw new Error("Wrong API call!");
    }
    console.log(API);
    return (dispatch) => {
        axios 
            .post(`${API}/auth/signin`, { email, password })
            .then(response => {
                setCookie("token", response.data.token);
                setCookie("user", JSON.stringify(response.data.data));
                Router.push("/");
                dispatch({ type: AUTHENTICATE, payload: response.data.token});
                dispatch({ type: SET_USER, payload: response.data.data});
            })
            .catch(err => {
                devLogger(err);
            });
    }
};



export const authenticateAction = ({ email, password}) => dispatch =>
    {
        console.log({ email, password });
        axios.post(`https://lit-reef-54228.herokuapp.com/api/auth/signin`, {
        method: 'POST',
        body: JSON.stringify({
            email, password
        })
    })
        .then(response => dispatch({ type: AUTHENTICATE, payload: response.data.token}))
        .then(response => {
            console.log('ok set cookie', response.token);
            setCookie('token', response.token);
            // Router.push('/');
            dispatch({ type: AUTHENTICATE, payload: response.token});
        })
        .catch(err => console.log(err));
    };

// deAuthentication
export const deAuthenticateAction = () => {
    return {
        type: DEAUTHENTICATE
    }
};

// restore state
export const restoreState = (authState) => {
    return {
        type: RESTORE_AUTH_STATE,
        payload: authState
    }
};


// sign up
export const signUp = signUpDetails => {
    return async dispatch => {
        try {
            dispatch(deAuthenticateAction());
            // signup code. and storing data in result var
            dispatch(authenticateAction(result));
        }catch (e) {
            dispatch(deAuthenticateAction());
        }
    }
};

// logout
export const logout = () => {
    return async dispatch => {
        dispatch(deAuthenticateAction())
    }
};

// restore
export const restore = (savedState) => {
    return dispatch => {
        dispatch(restoreState(savedState));
    }
};

