import Link from 'next/link'

interface CardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
}

const HelpCard = ({ children, href, ...props }: CardProps) => {
  return (
    <Link 
      href={href}
      className="bg-white rounded-lg flex flex-col gap-2 items-center justify-center border border-gray-200 shadow p-6 min-h-[12em] hover:scale-105 hover:shadow-md !transition-all"
      {...props}
    >
      {children}
    </Link>
  )
}

export default HelpCard