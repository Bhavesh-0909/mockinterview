import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        // Core styles
        "relative flex h-9 w-9 items-center justify-center text-sm shadow-xs transition-all outline-none",

        // Border + radius
        "first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)] border border-[var(--color-input)]",

        // Active state
        "data-[active=true]:z-10 data-[active=true]:ring-[3px] data-[active=true]:border-[var(--color-ring)] data-[active=true]:ring-[var(--color-ring)]",

        // Invalid state
        "aria-invalid:border-[var(--color-destructive)] data-[active=true]:aria-invalid:border-[var(--color-destructive)] data-[active=true]:aria-invalid:ring-[var(--color-destructive)]/30",

        // Background
        "bg-[color:var(--color-muted)] dark:bg-[color:var(--color-muted)]",

        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-[var(--color-foreground)] duration-1000" />
        </div>
      )}
    </div>
  )
}


function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
