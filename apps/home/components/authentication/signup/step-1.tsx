import React, { useState } from 'react'

import { AccountType } from '@/components/authentication/signup/index'
import { Button } from '@/components/button'
import Input from '@/components/input'
import { RadioGroup, RadioGroupItem } from '@/components/radio-group'
import InformationCircleIcon from '@/icons/information-circle.svg'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

const Step1 = () => {
  const [accountType, setAccountType] = useState<AccountType | undefined>()
  const [name, setName] = useState<string>('')
  const { t, i18n } = useTranslation('signup')
  
  const headingBreak = Math.floor(t('step1.heading').split(' ').length / 2 - 1)

  return (
    <div className="flex flex-col h-full items-center justify-between gap-5">
      <h1 className="text-3xl font-bold text-center">
        {t('step1.heading').split(' ').map((line, index) => (
          <React.Fragment key={index}>
            {line} {' '}
            {index === headingBreak && <br />}
          </React.Fragment>
        ))}
      </h1>
      <RadioGroup
        className="w-full"
        value={accountType}
        onValueChange={(value) => setAccountType(value as AccountType)}
      >
        <label
          htmlFor={AccountType.ADULT}
          className="flex rtl:flex-row-reverse items-center justify-between px-4 py-2 rounded border border-neutral-400 hover:cursor-pointer hover:border-neutral-900 transition-colors"
        >
          <div className="flex flex-col rtl:items-end gap-0.5">
            <h2 className="font-semibold">
              {t('step1.accountType.adult.title')}
            </h2>
            <p 
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              className="text-neutral-500"
            >
              {t('step1.accountType.adult.description')}
            </p>
          </div>
          <RadioGroupItem
            value={AccountType.ADULT}
            id={AccountType.ADULT}
          />
        </label>
        <label
          htmlFor={AccountType.SENIOR}
          className="flex rtl:flex-row-reverse items-center justify-between px-4 py-2 rounded border border-neutral-400 hover:cursor-pointer hover:border-neutral-900 transition-colors"
        >
          <div className="flex flex-col rtl:items-end gap-0.5">
            <h2 className="font-semibold">
              {t('step1.accountType.senior.title')}
            </h2>
            <p 
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              className="text-neutral-500"
            >
              {t('step1.accountType.senior.description')}
            </p>
          </div>
          <RadioGroupItem
            value={AccountType.SENIOR}
            id={AccountType.SENIOR}
          />
        </label>
      </RadioGroup>
      <div className="flex flex-col w-full gap-1.5">
        <label
          className="text-sm font-medium text-neutral-500"
          htmlFor="name"
        >
          {t('step1.yourName')}
        </label>
        <Input
          id="name"
          type="text"
          placeholder={t('step1.yourNamePlaceholder') as string}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col w-full gap-1.5">
        <AnimatePresence mode="wait">
          {accountType === AccountType.SENIOR ? (
            <motion.div
              key="id-verification"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1 text-neutral-500 h-4"
            >
              <InformationCircleIcon className="w-4 h-4" />
              <p className="text-sm">
                {t('step1.idVerification')}
              </p>
            </motion.div>
          ) : (
            <div
              key="id-empty"
              className="h-4"
            />
          )}
        </AnimatePresence>
        <Button
          className="relative z-[1] w-full"
          variant="primary"
          disabled={!accountType || !name}
        >
          {t('step1.continue')}
        </Button>
      </div>
    </div>
  )
}

export default Step1