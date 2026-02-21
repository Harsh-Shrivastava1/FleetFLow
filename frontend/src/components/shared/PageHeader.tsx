import type { LucideIcon } from 'lucide-react';

interface PageHeaderAction {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: 'default' | 'outline';
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: PageHeaderAction[];
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {actions && actions.length > 0 && (
                <div className="flex gap-2">
                    {actions.map((action, i) => {
                        const isOutline = action.variant === 'outline';
                        return (
                            <button
                                key={i}
                                onClick={action.onClick}
                                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isOutline
                                        ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                            >
                                {action.icon && <action.icon className="h-4 w-4" />}
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
