import React from 'react'

import ChevronDownIcon from '@/icons/chevron-down.svg'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

export const Accordion = AccordionPrimitive.Root

// export const Accordion = React.forwardRef<
//   React.ElementRef<typeof AccordionPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
// >(({ children, className, ...props }, forwardedRef) => (
//   <AccordionPrimitive.Root
//     ref={forwardedRef}
//     collapsible
//     type="single"
//     className={cn('space-y-5 ml-4 mr-4 w-full', className)}
//     {...props}
//   >
//     {children}
//   </AccordionPrimitive.Root>
// ))

Accordion.displayName = AccordionPrimitive.Root.displayName

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Item
    className={cn(
      'rounded border border-solid border-[#E5E5E5] outline-slate-600',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitive.Item>
))

AccordionItem.displayName = AccordionPrimitive.Item.displayName

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'group flex flex-1 cursor-default items-center justify-between bg-white py-6 px-10 leading-none outline-none data-[state=open]:bg-[#FAFAFA] data-[state=open]:pb-0 text-[#171717] font-semibold text-xl rounded',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="h-5 w-5 text-[#A3A3A3] group-hover:text-[#404040] ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#404040]"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// interface AccordionContentProps
//   extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
//   open?: boolean
// }

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <AnimatePresence>
    <AccordionPrimitive.Content
      asChild
      className={cn('overflow-hidden bg-[#FAFAFA] rounded px-10 ', className)}
      {...props}
      ref={forwardedRef}
    >
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
        transition={{
          duration: 0.3,
        }}
      >
        <div className="text-base text-[#525252] font-normal py-6">
          {children}
        </div>
      </motion.div>
    </AccordionPrimitive.Content>
  </AnimatePresence>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// todo add animation for accordion content to smoothly close when unfocused
