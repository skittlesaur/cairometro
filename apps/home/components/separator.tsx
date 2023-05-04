import * as React from 'react'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import cn from 'classnames'

type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  vertical?: boolean
  horizontal?: boolean
  color?: `bg-${string}`
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      vertical, horizontal, color = 'bg-gray-900/20', ...props
    },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative
      orientation={vertical ? 'vertical' : 'horizontal'}
      className={cn(
        'shrink-0 bg-border',
        horizontal ? 'h-[1px] w-full' : 'h-full w-[1px]',
        color
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
