import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Verify = () => {
  const router = useRouter()
  const email = Array.isArray(router.query.email) ? router.query.email[0] : router.query.email

  useEffect(() => {
    if (!email) {
      router.push('/login')
    }
  }, [email, router])

  return (
    <div>
      @todo: verify email page
      <p>Email: {email}</p>
    </div>
  )
}

export default Verify