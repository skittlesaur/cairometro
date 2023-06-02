import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Loader from '@/components/loader'

import axios from 'axios'

const LinkPage: NextPage = () => {
  const router = useRouter()
  const magicLink = router.query.link as string

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        if (!magicLink) return
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/magic-link`, {
          link: magicLink,
        }, {
          withCredentials: true,
        })
        // close window
        setTimeout(() => window.close(), 1000)
      } catch (e) {
        // navigate to login page
        router.push('/login?error=invalid-link')
      }
    }
    verifyMagicLink()
  }, [magicLink, router])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}


export default LinkPage