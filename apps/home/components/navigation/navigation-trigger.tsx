import * as React from 'react'

import ChevronDown from '@/icons/chevron-down.svg'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import cn from 'classnames'

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'text-gray-600 inline-flex items-center justify-center rounded-md text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none hover:text-black data-[state=open]:text-black data-[state=open]:bg-gray-200/50 data-[active]:text-black data-[active]:bg-gray-200/50 py-2 px-3',
      className
    )}
    {...props}
  >
    {children}{' '}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

export default NavigationMenuTrigger