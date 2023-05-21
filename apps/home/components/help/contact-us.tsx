import Link from 'next/link'

import {  buttonVariants } from '@/components/button'

import cn from 'classnames'

const ContactUs = () => {
  return (
    <div className="text-center bg-gray-100 border border-gray-200 rounded min-h-[20em] flex flex-col gap-3 items-center justify-center p-6">
      <p className="text-neutral-500">
        Didn{"'"}t find what you were looking for?
      </p>
      <h2 className="!text-3xl !font-normal">
        Contact our support team in live chat
      </h2>
      <Link
        href="/help/chat"
        className={cn(
          buttonVariants({ variant: 'primary', size: 'lg' }),
          '!text-white'
        )}
      >
        Contact Us
      </Link>
    </div>
  )
}

export default ContactUs