import { useRouter } from 'next/router'

import useUser from '@/graphql/user/me'

const AuthenticatedUser = ({ children }: {children: React.ReactNode}) => {
  const { data: user, isLoading: userLoading } = useUser()
  const router = useRouter()

  if (userLoading) return null

  if (!user) {
    router.push('/')
    return null
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default AuthenticatedUser