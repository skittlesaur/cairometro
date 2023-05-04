import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'

import Policy from '@/components/authentication/signup/policy'
import Step1, { Step1Ref } from '@/components/authentication/signup/step-1'
import Step2, { Step2Ref } from '@/components/authentication/signup/step-2'
import signupMutation from '@/graphql/user/signup'

import toast from 'react-hot-toast'


export enum AccountType {
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

export interface SignupStepProps {
  nextStep: ()=> void
}

const Signup = () => {
  const router = useRouter()
  const [data, setData] = useState<{ step: number, accountType?: AccountType, name: string, email: string }>({
    step: 1,
    name: '',
    email: '',
  })

  const step1Ref = useRef<Step1Ref>(null)
  const step2Ref = useRef<Step2Ref>(null)

  const handleStep1Submit = async () => {
    if (!step1Ref.current) return

    const { isValid, getValues } = step1Ref.current
    if (!isValid()) return

    const { accountType, name } = getValues()

    return setData(prev => ({
      ...prev,
      accountType,
      name,
      step: prev.step + 1,
    }))
  }

  const handleStep2Submit = async () => {
    if (!step2Ref.current) return

    const { isValid, getValues } = step2Ref.current
    if (!isValid()) return

    const { email } = getValues()


    // if the user is a senior they are required to upload documents so go to step 3
    if (data.accountType === AccountType.SENIOR) {
      return setData(prev => ({
        ...prev,
        email,
        step: prev.step + 1,
      }))
    }

    // if the user is an adult they are not required to upload documents so go to the verification page and mutate directly
    try {
      await signupMutation({
        userRole: {
          userRole: AccountType.ADULT,
        },
        name: data.name,
        email,
      })
      router.push('/auth/verify')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const nextStep = async () => {
    if (data.step === 1) {
      return handleStep1Submit()
    }

    if (data.step === 2) {
      return handleStep2Submit()
    }

    // @todo handle senior documents
  }

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
      <div className="min-h-[50%] flex flex-col max-w-[calc(100%-2em)] w-[26em]">
        {data.step === 1 && (
          <Step1
            ref={step1Ref}
            nextStep={nextStep}
          />
        )}
        {data.step === 2 && (
          <Step2
            ref={step2Ref}
            nextStep={nextStep}
          />
        )}
      </div>
      <Policy />
    </div>
  )
}

export default Signup