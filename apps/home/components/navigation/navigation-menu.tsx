import * as React from 'react'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import cn from 'classnames'

interface NavigationMenuProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
  list?: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
}

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({
  className, children, list, ...props 
}, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    <NavigationMenuPrimitive.List
      className={cn(
        'flex flex-1 list-none items-center justify-center space-x-1',
        list?.className
      )}
    >
      {children}
    </NavigationMenuPrimitive.List>
  </NavigationMenuPrimitive.Root>
))

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

export default NavigationMenu