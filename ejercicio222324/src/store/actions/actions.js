export const API_CALL_REQ = 'API_CALL_REQ'
export const API_CALL_SUC = 'API_CALL_SUC'
export const API_CALL_FAIL = 'API_CALL_FAIL'

export const login = (email,password) => {
    return {
        type: API_CALL_REQ,
        payload: {
            request:{
                method: 'post',
                url: 'https://reqres.in/api/login',
                data: {
                    email: email,
                    password: password
                }
            },
            okAction: API_CALL_SUC,
            failAction: API_CALL_FAIL
        }
    }
}

export const httpRequest = (method, url, data) => {
    return{
        type: API_CALL_REQ,
        payload: {
            request:{
                method: 'post',
                url: 'https://reqres.in/api/login',
                data: data
            },
            okAction: API_CALL_SUC,
            failAction: API_CALL_FAIL
        }
    }
}