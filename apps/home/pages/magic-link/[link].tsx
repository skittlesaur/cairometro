import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import magicLinkMutation from '@/graphql/user/magic-link'

const LinkPage: NextPage = () => {
  const router = useRouter()
  const magicLink = router.query.link as string

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        if (!magicLink) return
        await magicLinkMutation({ link: magicLink })
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
    <div>
    </div>
  )


}


export default LinkPage