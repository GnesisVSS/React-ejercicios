import { connect } from 'react-redux'
import { httpRequest } from "../../store/actions/actions"
import LoginForm from '../pure/LoginForm'

const mapStateToProps = (state) => {
    return{
        login: state.userState.loged,
        fetching: state.userState.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email,password) => {
            const data = {
                email: email,
                password: password
            }

            const url = 'https://reqres.in/api/login'
            dispatch(httpRequest('post',url,data))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps,mapDispatchToProps)(LoginForm)
export default LoginFormContainer