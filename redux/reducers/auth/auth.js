import { RESTORE_AUTH_STATE, DEAUTHENTICATE, AUTHENTICATE} from "../../types/auth";

import { getCookie, removeCookie, setCookie} from "../../../utils/cookie";

let initialState;
if( typeof localStorage !== "undefined"){
    const authCookie = getCookie('auth');
    if (authCookie) {
        initialState = JSON.parse(decodeURIComponent(authCookie));
    } else {
        initialState = {
            isLoggedIn: false,
            user: {}
        }
    }
}

// auth reducer
const auth = (state = initialState, action) => {
    switch (action.type) {
        case DEAUTHENTICATE:
            removeCookie('auth');
            return {
                isLoggedIn: false
            };
        case AUTHENTICATE:
            const authObj = {
                isLoggedIn: true,
                user: action.payload
            };
            setCookie('auth', authObj);
            return authObj;
        case RESTORE_AUTH_STATE:
            return {
                isLoggedIn: true,
                user: action.payload.user
            };
        default:
            return false;
    }
};

export default auth;