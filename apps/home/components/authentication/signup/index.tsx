import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import AccountTypeAndName, { accountTypeAndNameRefType } from '@/components/authentication/signup/account-type-and-name'
import Documents, { documentRefType } from '@/components/authentication/signup/documents'
import Email, { emailRefType } from '@/components/authentication/signup/email'
import Policy from '@/components/authentication/signup/policy'
import signupMutation from '@/graphql/user/signup'

import toast from 'react-hot-toast'


export enum AccountType {
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

enum SignupStep {
  ACCOUNT_TYPE_AND_NAME,
  EMAIL,
  DOCUMENTS,
}

export interface SignupStepProps {
  nextStep: ()=> void
}

const Signup = () => {
  const router = useRouter()
  const [data, setData] = useState<{ step: SignupStep, accountType?: AccountType, name: string, email: string, documentUrl: string }>({
    step: SignupStep.ACCOUNT_TYPE_AND_NAME,
    name: '',
    email: '',
    documentUrl: '',
  })

  const accountTypeAndNameRef = useRef<accountTypeAndNameRefType>(null)
  const emailRef = useRef<emailRefType>(null)
  const documentRef = useRef<documentRefType>(null)

  const handleAccountTypeAndNameSubmit = async () => {
    if (!accountTypeAndNameRef.current) return

    const { isValid, getValues } = accountTypeAndNameRef.current
    if (!isValid()) return

    const { accountType, name } = getValues()
    
    if (accountType === AccountType.SENIOR) {
      return setData(prev => ({
        ...prev,
        accountType,
        name,
        step: SignupStep.DOCUMENTS,
      }))
    }

    return setData(prev => ({
      ...prev,
      accountType,
      name,
      step: SignupStep.EMAIL,
    }))
  }

  const handleEmailSubmit = async () => {
    if (!emailRef.current) return

    const { isValid, getValues } = emailRef.current
    if (!isValid()) return

    const { email } = getValues()

    try {
      const result = await signupMutation({
        userRole: {
          userRole: data.accountType === AccountType.ADULT ? 'ADULT' : 'SENIOR',
        },
        name: data.name,
        email,
        documentUrl: data.documentUrl,
      })
      console.log(result)
      router.push('/auth/verify')
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong')
    }
  }

  const handleDocumentsSubmit = () => {
    if (!documentRef.current) return

    const { isValid, getValues } = documentRef.current

    if (!isValid()) return

    const { documentUrl } = getValues()

    setData(prev => ({
      ...prev,
      documentUrl,
      step: SignupStep.EMAIL,
    }))
  }
  const nextStep = async () => {
    if (data.step === SignupStep.ACCOUNT_TYPE_AND_NAME) {
      return handleAccountTypeAndNameSubmit()
    }

    if (data.step === SignupStep.EMAIL) {
      return handleEmailSubmit()
    }

    if (data.step === SignupStep.DOCUMENTS) {
      return handleDocumentsSubmit()
    }
  }

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
      <div className="min-h-[50%] flex flex-col max-w-[calc(100%-2em)] w-[28em]">
        {data.step === SignupStep.ACCOUNT_TYPE_AND_NAME && (
          <AccountTypeAndName
            ref={accountTypeAndNameRef}
            nextStep={nextStep}
          />
        )}
        {data.step === SignupStep.EMAIL && (
          <Email
            ref={emailRef}
            nextStep={nextStep}
          />
        )}
        {data.step === SignupStep.DOCUMENTS && (
          <Documents
            ref={documentRef}
            nextStep={nextStep}
          />
        )}
      </div>
      <Policy />
    </div>
  )
}

export default Signup