import { useCallback, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import logoutMutation from '@/graphql/user/logout'

const LogoutPage: NextPage = () => {
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation()
      await router.replace('/login')
    } catch (error) {
      await router.replace('/')
    }
  }, [router])

  useEffect(() => {
    if (!router.isReady) return
    handleLogout()
  }, [handleLogout, router.isReady])
  
  return (
    <div>
      
    </div>
  )
}

export default LogoutPage