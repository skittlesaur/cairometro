import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import ContinueWithGoogle from '@/components/continue-with-google'
import Input from '@/components/input'
import OrSeparator from '@/components/or-separator'
import loginMutation from '@/graphql/user/login'

import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

const LoginForm = () => {
  const { t } = useTranslation('login')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleEmailSubmission = async (email: string) => {
    try {
      const login = await loginMutation({ email: email })

      if (login) router.push('/auth/verify')
    } catch (error) {
      const errorMessage = JSON.parse(JSON.stringify(error)).response.errors[0]
        .message
      toast.error(`${errorMessage}`)
    }
  }

  return (
    <div className="w-[calc(50%-6em)] h-screen flex flex-col gap-10 items-center justify-center">
      <div className="w-full flex flex-col gap-16 px-12">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-7">
            <p className="text-3xl text-black font-bold self-center">
              {t('login')}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-500">
                {t('email')}
              </p>
              <Input onChange={(e) => setEmail(e.target.value)}></Input>
            </div>
            <Button onClick={() => handleEmailSubmission(email)}>
              {t('login')}
            </Button>
          </div>
          <OrSeparator>{t('or')}</OrSeparator>
          <ContinueWithGoogle></ContinueWithGoogle>
        </div>
        <div className="text-sm text-neutral-600 self-center">
          {t('signupinstead.question')
            .split(' ')
            .map((word, index) => (
              <React.Fragment key={index}>
                {index !== 0 && ' '}
                {word === '{0}' ? (
                  <Link
                    className="text-primary font-semibold hover:text-primary/80 transition-color"
                    href={'/signup'}
                  >
                    {t('signupinstead.signup')}
                  </Link>
                ) : (
                  word
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
