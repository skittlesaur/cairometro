import Link from 'next/link'

import { Button } from '@/components/button'
import ContinueWithGoogle from '@/components/continue-with-google'
import Input from '@/components/input'
import OrSeparator from '@/components/or-separator'

const LoginForm = () => {
  return (
    <div className="w-[calc(50%-6em)] h-screen flex flex-col gap-10 items-center justify-center">
      <div className="w-full flex flex-col gap-16 px-12">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-7">
            <p className="text-3xl text-black font-bold self-center">Login</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-500">
                Email Address
              </p>
              <Input></Input>
            </div>
            <Button>Login</Button>
          </div>
          <OrSeparator>OR</OrSeparator>
          <ContinueWithGoogle></ContinueWithGoogle>
        </div>
        <div className="text-sm text-neutral-600 self-center">
          You don’t have an account yet?
          <Link
            href={'/signup'}
            className="text-primary font-semibold hover:text-primary/80 transition-color"
          >
            {' '}
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
