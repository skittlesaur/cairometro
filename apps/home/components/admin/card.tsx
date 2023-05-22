import { ReactNode } from 'react'

const Card = ({ children }: {children?: ReactNode}) => {
  return (
    <div className="relative flex flex-col px-8 py-5 overflow-hidden w-full rounded-lg min-h-[10.5em] before:absolute before:inset-0 before:z-[-1] before:bg-gray-50/80 before:backdrop-blur border border-gray-300">
      {children}
    </div>
  )
}

export default Card