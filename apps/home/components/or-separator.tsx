import { ReactNode } from 'react'

interface OrSeparatorProps {
  children: ReactNode
}

const OrSeparator = ({ children }: OrSeparatorProps) => {
  return (
    <div className="relative h-10 w-full">
      <p className="z-[1] w-1/3 text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 uppercase text-neutral-500 or-gradient">
        {children}
      </p>
      <div
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-300"
        aria-hidden="true"
      />
      <style jsx>{`
        .or-gradient {
          background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 20.83%, #FFFFFF 78.13%, rgba(255, 255, 255, 0) 100%);
        }
      `}
      </style>
    </div>
  )
}

export default OrSeparator