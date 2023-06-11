import { useRouter } from 'next/router'

import { Button } from '@/components/button'
import LogoGoogle from '@/icons/logo-google.svg'

import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import toast from 'react-hot-toast'

const GoogleButton = () => {
  const router = useRouter()
  const { t } = useTranslation('common')

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
          accessToken: response?.access_token,
        })

        router.push('/')
      } catch (e) {
        toast.error('Login failed')
      }
    },
    onError: () => {
      toast.error('Login failed')
    },
  })
  
  return (
    <Button
      className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-600"
      variant="outline"
      size="lg"
      onClick={() => {
        login()
      }}
    >
      <LogoGoogle className="w-6 h-6" />
      <span className="text-sm font-medium">
        {t('components.continueWithGoogle.text')}
      </span>
    </Button>
  )
}

const ContinueWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <GoogleButton />
    </GoogleOAuthProvider>
  )
}

export default ContinueWithGoogle