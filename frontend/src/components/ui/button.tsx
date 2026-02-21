import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {

    let variantStyles = "bg-black text-white hover:bg-black/90";
    if (variant === "outline") {
      variantStyles = "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900";
    } else if (variant === "ghost") {
      variantStyles = "hover:bg-gray-100 hover:text-gray-900";
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 ${variantStyles} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
