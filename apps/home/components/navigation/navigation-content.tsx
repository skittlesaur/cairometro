import * as React from 'react'

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AnimatePresence mode="wait">
    <NavigationMenuPrimitive.Content
      ref={ref}
      asChild
      {...props}
    >
      <motion.div
        initial={{
          opacity: 0, y: -20, x: '-50%', scale: 0.8,
        }}
        animate={{
          opacity: 1, y: 0, x: '-50%', scale: 1, 
        }}
        exit={{
          opacity: 0, y: -20, x: '-50%', scale: 0.8,
        }}
        transition={{
          stiffness: 300, damping: 30, type: 'spring', bounce: 0.25,
        }}
        className={cn(
          'left-1/2 -translate-x-1/2 top-full w-fit absolute',
        )}
      >
        <div className={cn('relative w-fit mt-4 border border-gray-200 rounded px-3 py-2 before:absolute before:inset-0 before:z-[-1] before:bg-white/90 before:backdrop-blur-sm', className)}>
          {children}
        </div>
      </motion.div>
    </NavigationMenuPrimitive.Content>
  </AnimatePresence>
))

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

export default NavigationMenuContent