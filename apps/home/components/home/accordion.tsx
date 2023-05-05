import React from 'react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import cn from 'classnames'


const Accordion = (props:) => (
  <AccordionPrimitive.Root>
    <AccordionPrimitive.Item value="item-1">
      <AccordionPrimitive.Trigger>Is it accessible?</AccordionPrimitive.Trigger>
      <AccordionPrimitive.Content>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>

    <AccordionPrimitive.Item value="item-2">
      <AccordionPrimitive.Trigger>Is it unstyled?</AccordionPrimitive.Trigger>
      <AccordionPrimitive.Content>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel.
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>

    <AccordionPrimitive.Item value="item-3">
      <AccordionPrimitive.Trigger>
        Can it be animated?
      </AccordionPrimitive.Trigger>
      <AccordionPrimitive.Content>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  </AccordionPrimitive.Root>
)

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionPrimitive.Item
      className={cn(
        'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </AccordionPrimitive.Item>
  )
)
AccordionItem.displayName = AccordionPrimitive.Item.displayName

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionPrimitive.Content
      className={cn(
        'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// export default Accordion
