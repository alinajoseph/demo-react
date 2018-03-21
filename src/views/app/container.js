import { connect } from 'react-redux'
import {loginUser} from '../../store/user/duck'
import AppComponent from './component'
const AppContainer = connect(
  // Map state to props
  (state) => ({
   user: state.user.user,
    isSubmitting: state.user.isSubmitting,
    rxError: state.user.error,
    phase: state.user.phase  
  }),
  // Map actions to dispatch and props
 {
    loginUser
  }
)(AppComponent)
export default AppContainer
