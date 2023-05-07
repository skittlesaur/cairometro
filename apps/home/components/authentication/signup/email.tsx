import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { SignupStepProps } from '@/components/authentication/signup/index'
import { Button } from '@/components/button'
import ContinueWithGoogle from '@/components/continue-with-google'
import Input from '@/components/input'
import OrSeparator from '@/components/or-separator'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

export type emailRefType = {
  isValid: ()=> boolean
  getValues: ()=> {
    email: string
  }
}

const Email = forwardRef(({ nextStep }: SignupStepProps, ref) => {
  const [email, setEmail] = useState<string>('')
  const { t } = useTranslation('signup')

  const headingBreak = Math.floor(t('email.heading').split(' ').length / 2 - 1)

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  useImperativeHandle(ref, () => ({
    isValid: () => {
      return isEmailValid()
    },
    getValues: () => {
      return {
        email,
      }
    },
  }))

  return (
    <div className="flex flex-col h-full items-center justify-between gap-7">
      <h1 className="text-3xl font-bold text-center">
        {t('email.heading').split(' ').map((line, index) => (
          <React.Fragment key={index}>
            {line} {' '}
            {index === headingBreak && <br />}
          </React.Fragment>
        ))}
      </h1>
      <div className="flex flex-col gap-3 w-full grow">
        <div className="flex flex-col w-full gap-1.5">
          <label
            className="text-sm font-medium text-neutral-500"
            htmlFor="email"
          >
            {t('email.emailAddress')}
          </label>
          <Input
            id="name"
            type="email"
            placeholder={t('email.emailAddressPlaceholder') as string}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <AnimatePresence mode="wait">
          {isEmailValid() && (
            <motion.div
              key="continue-button"
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="relative z-[1] w-full"
                variant="primary"
                disabled={!isEmailValid()}
                onClick={nextStep}
              >
                {t('email.connectEmail')}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <OrSeparator>
          {t('email.or')}
        </OrSeparator>
        <ContinueWithGoogle />
      </div>
    </div>
  )
})

Email.displayName = 'Signup-Email'

export default Email