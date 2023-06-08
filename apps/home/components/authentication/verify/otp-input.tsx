import { useEffect, useRef, useState } from 'react'
import axios from "axios"

// import { Button } from '@/components/button'
interface OtpInputProps {
    email: string
  }
const OtpInput = ({ email }:OtpInputProps) => {



  const [otp, setOtp] = useState('')
  const inputRefs = useRef<HTMLInputElement[]>([])
  useEffect (()=>{

    if (otp.length === 4) {
        submitOTP();
      }

  }, [otp])

  const submitOTP = async () => {
    try {
        console.log(otp)
      if (!otp) return
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp`, {
        code: otp,
        email:email
      }, {
        withCredentials: true,
      })
    } catch (e) {

    }
  }
    
  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const value = input.value

    // Only allow numbers from 0 to 9
    const validValue = value.replace(/[^0-9]/g, '')

    setOtp(prevOtp => {
      const newOtp = prevOtp.substring(0, index) + validValue + prevOtp.substring(index + 1)
      return newOtp
    })

    if (value.length === input.maxLength && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }

    
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.key
    const isNumberKey = /^[0-9]$/.test(keyPressed)

    if (!isNumberKey && otp.charAt(index) === '') {
      e.preventDefault()
    }

    if (keyPressed === 'Backspace' && index > 0 && otp.charAt(index) === '') {
      inputRefs.current[index - 1].focus()
    }
  } 

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        <div className="flex space-x-2">
          <input
            ref={el => (inputRefs.current[0] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 rounded-md"
            value={otp.charAt(0) || ''}
            onChange={e => handleInputChange(0, e)}
          
            onKeyDown={e => handleKeyDown(0, e)}
          />
          <input
            ref={el => (inputRefs.current[1] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 rounded-md"
            value={otp.charAt(1) || ''}
            onChange={e => handleInputChange(1, e)}
          
            onKeyDown={e => handleKeyDown(1, e)}

          />
          <input
            ref={el => (inputRefs.current[2] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 rounded-md"
            value={otp.charAt(2) || ''}
            onChange={e => handleInputChange(2, e)}
          
            onKeyDown={e => handleKeyDown(2, e)}
          />
          <input
            ref={el => (inputRefs.current[3] = el!)}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-neutral-300 rounded-md"
            value={otp.charAt(3) || ''}
            onChange={e => handleInputChange(3, e)}
          
            onKeyDown={e => handleKeyDown(3, e)}
          />
        </div>
      </div>
      {/* <button
        className="px-4 py-2 rounded-lg bg-primary text-white disabled:bg-neutral-300 disabled:text-neutral-500"
        disabled={!isOtpComplete}
        onClick={submitOTP}
      >
        submit
      </button> */}
    </div>

  )
}
export default OtpInput