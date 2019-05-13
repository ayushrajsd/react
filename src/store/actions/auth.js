import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => { 
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => { 
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => { 
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => { 
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => { 
    return dispatch => { 
        setTimeout(() => { 
            debugger;
            dispatch(logout())

        },expirationTime*1000)
    }
}

export const auth = (email, password, isSignUp, building) => { 
    return dispatch => { 
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB7FasTPaBruHLwFhEjh5u0x-4qYGfBFQc';
        if (isSignUp) { 
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB7FasTPaBruHLwFhEjh5u0x-4qYGfBFQc'
        }
        axios.post(url, authData)
            .then(response => { 
                // console.log(response)
                const expirationTime = new Date(new Date().getTime()  + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationTime', expirationTime)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                // if (building) { 
                //     dispatch(setAuthRedirectPath("/checkout"))
                // }
                
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => { 
                // console.log(err)
                dispatch(authFail(err.response.data.error.message))
            })
    }
}

export const setAuthRedirectPath = (path) => { 
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else { 
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId');
            if (expirationTime > new Date()) {
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationTime.getTime()- new Date().getTime())/1000))
            } else { 
                dispatch(logout())
            }
        }
     }
 }

