import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
    let variantStyles = "bg-gray-900 text-gray-50 hover:bg-gray-900/80";

    if (variant === "secondary") {
        variantStyles = "bg-gray-100 text-gray-900 hover:bg-gray-100/80";
    } else if (variant === "outline") {
        variantStyles = "text-gray-950 border border-gray-200";
    } else if (variant === "success") {
        variantStyles = "bg-green-100 text-green-800 border-green-200";
    } else if (variant === "warning") {
        variantStyles = "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (variant === "destructive") {
        variantStyles = "bg-red-100 text-red-800 border-red-200";
    }

    return (
        <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variantStyles} ${className}`}
            {...props}
        />
    )
}
