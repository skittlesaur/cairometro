import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/button'
import ContinueWithGoogle from '@/components/continue-with-google'
import Input from '@/components/input'
import OrSeparator from '@/components/or-separator'

import { useTranslation } from 'next-i18next'

const LoginForm = () => {
  const { t } = useTranslation('login')

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
              <Input></Input>
            </div>
            <Button>{t('login')}</Button>
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
