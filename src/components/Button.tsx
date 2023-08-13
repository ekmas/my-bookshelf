import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'px-6 py-3 bg-secondary hover:bg-secondaryHover text-black dark:bg-darkSecondary hover:dark:bg-darkSecondaryHover dark:text-white',
        cta: 'px-6 py-3 bg-primary text-white hover:bg-primaryHover',
        link: 'bg-transparent dark:bg-transparent text-black dark:text-white transition-opacity transition-colors hover:bg-transparent hover:opacity-80 dark:hover:bg-transparent',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
