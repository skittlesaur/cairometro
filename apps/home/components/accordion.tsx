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
      'rounded border border-solid border-neutral-200 bg-white data-[state=open]:bg-neutral-50 transition-colors duration-300',
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
  <AccordionPrimitive.Header className="flex gap-2">
    <AccordionPrimitive.Trigger
      className={cn(
        'group flex flex-1 cursor-default items-center justify-between py-6 px-10 leading-none outline-none font-semibold text-xl rounded text-neutral-600 hover:text-neutral-800 data-[state=open]:text-neutral-800 text-left',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="h-5 w-5 text-neutral-400 group-hover:text-neutral-700 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-neutral-700" />
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
      'overflow-hidden rounded px-10 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="text-base text-neutral-600 font-normal pb-6">
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
