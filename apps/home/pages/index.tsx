import type { NextPage } from 'next'

import useUser from '@/graphql/user/me'

const HomePage: NextPage = () => {
  const user = useUser()
  console.log(user.data)
  console.log(user.error)

  return (
    <div className="w-screen h-screen flex flex-col gap-6 items-center justify-center overflow-hidden relative">
      <h1 className="flex items-center gap-4 text-6xl font-bold tracking-tight">
        <span>
          🪐
        </span>
        <span>
          baraa.app
        </span>
      </h1>
      <p className="max-w-[40em] text-center mx-4 text-neutral-500">
        TurboRepo template 2.0. Includes preconfigured Next 13, SWR (Axios), Tailwind, svgr for the frontend.
        Backend wise, uses Express, Prisma, and TypeScript
      </p>
    </div>
  )
}

export default HomePage