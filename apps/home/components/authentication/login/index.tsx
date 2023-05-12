// import Radial from '@/components/radial-animation'

import LoginForm from './login-form'
import LoginScreenAnimation from './login-screen-animation'

const Login = () => {
  return (
    <div className="flex mr-[calc(-50vw+50%)]">
      <LoginForm></LoginForm>
      <LoginScreenAnimation></LoginScreenAnimation>
    </div>
  )
}

export default Login
