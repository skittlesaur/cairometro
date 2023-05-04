import React from 'react'

import Policy from '@/components/authentication/signup/policy'
import Step1 from '@/components/authentication/signup/step-1'


export enum AccountType {
  ADULT = 'ADULT',
  SENIOR = 'SENIOR',
}

const Signup = () => {

  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
      <div className="min-h-[50%] flex flex-col max-w-[calc(100%-2em)] w-[26em]">
        <Step1 />
      </div>
      <Policy />
    </div>
  )
}

export default Signup