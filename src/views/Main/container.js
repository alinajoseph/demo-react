import { connect } from 'react-redux'
import {loginUser} from '../../store/user/duck'
import LoginForm from './component'

const Login = connect(
  // Map state to props
  (state) => ({
    user: state.user.user,
    isSubmitting: state.user.isSubmitting,
    rxError: state.user.error,
    phase: state.user.phase 
  }),
  // Map actions to props
  {
    loginUser
    // handleSignOut
  }
) (LoginForm)
export default Login
