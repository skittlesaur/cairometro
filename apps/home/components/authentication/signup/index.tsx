import React, { useRef, useState } from 'react'

import Policy from '@/components/authentication/signup/policy'
import Step1, { Step1Ref } from '@/components/authentication/signup/step-1'
import Step2 from '@/components/authentication/signup/step-2'


export enum AccountType {
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

export interface SignupStepProps {
  nextStep: ()=> void
}

const Signup = () => {
  const [step, setStep] = useState<number>(1)
  
  const step1Ref = useRef<Step1Ref>(null)
  const step2Ref = useRef(null)
  
  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
      <div className="min-h-[50%] flex flex-col max-w-[calc(100%-2em)] w-[26em]">
        {step === 1 && (
          <Step1
            ref={step1Ref}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
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