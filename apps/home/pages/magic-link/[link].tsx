import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import magicLinkMutation from '@/graphql/user/magic-link'



const LinkPage: NextPage = () => {

  const router = useRouter()
  const magicLink = router.query.link as string

  
  
  useEffect(()=>{
    const VerifyMagicLink = async () =>{

      try {
        if (magicLink){
          await magicLinkMutation({ link: magicLink })
        }

      }
      catch (e){
        console.log(e)
          
      }  
    } 
    VerifyMagicLink ()
  }, [magicLink])
  return (
    <div>

    
      in development
      
            
    </div>
  )

  
}
  
 
export default LinkPage