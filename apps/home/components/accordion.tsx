import React from 'react'

import ChevronDownIcon from '@/icons/chevron-down.svg'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import cn from 'classnames'

export const Accordion = AccordionPrimitive.Root

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
        'group flex flex-1 cursor-default items-center justify-between bg-white py-6 px-10 leading-none outline-none data-[state=open]:bg-[#FAFAFA] data-[state=open]:pb-0 font-semibold text-xl rounded text-[#525252] hover:text-[#171717] data-[state=open]:text-[#171717] transition-colors',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="h-5 w-5 text-[#A3A3A3] group-hover:text-[#404040] ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#404040] "
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    className={cn(
      'overflow-hidden bg-[#FAFAFA] rounded px-10 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="text-base text-[#525252] font-normal py-6">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
