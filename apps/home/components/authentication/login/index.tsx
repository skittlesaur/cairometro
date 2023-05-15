// import Radial from '@/components/radial-animation'

import LoginForm from './login-form'
import LoginScreenAnimation from './login-screen-animation'

const Login = () => {
  return (
    <div className="flex ltr:mr-[calc(-50vw+50%)] rtl:ml-[calc(-50vw+50%)]">
      <LoginForm />
      <LoginScreenAnimation />
    </div>
  )
}

export default Login
