import * as React from 'react'
import { MouseEvent, useCallback, useState } from 'react'

import Loader from '@/components/loader'

import { cva, VariantProps } from 'class-variance-authority'
import cn from 'classnames'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90',
        secondary: 'bg-gray-100 border border-gray-200 hover:bg-gray-100/50 hover:border-gray-300',
        danger: 'bg-red-700 text-white hover:bg-red-800',
        outline: 'border border-gray-300 hover:bg-gray-100',
        ghost: 'hover:bg-gray-100 border border-transparent hover:border-gray-200',
        link: 'underline-offset-4 hover:underline',
        linkSecondary: 'text-neutral-600 hover:text-black',
        ticket: 'transition-all duration-150 bg-primary text-white border border-transparent hover:border-primary hover:bg-transparent hover:text-primary transition-colors group-hover:border-primary group-hover:bg-transparent group-hover:text-primary',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 rounded-md',
        lg: 'h-11 rounded-md',
        xl: 'h-12 w-40 rounded',
      },
      padding: {
        default: 'px-4 py-2',
        sm: 'px-3',
        lg: 'px-8',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      padding: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  useLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size, 
    padding, 
    useLoading = false, 
    children,
    disabled,
    ...props
  },
  ref) => {
    const [loading, setLoading] = useState(false)

    const onButtonClick = useCallback(async (event: MouseEvent<HTMLButtonElement>) => {
      if (useLoading) setLoading(true)

      if (props.onClick) await props.onClick(event)

      if (useLoading) setLoading(false)
    }, [props, useLoading])

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        data-loading={useLoading ? loading : undefined}
        className={cn(buttonVariants({
          variant, size, padding, className,
        }))}
        {...props}
        onClick={onButtonClick}
      >
        {useLoading && loading ? (
          <Loader
            color={(!variant || variant === 'primary') ? 'white' : 'primary'}
            size="sm"
          />
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
