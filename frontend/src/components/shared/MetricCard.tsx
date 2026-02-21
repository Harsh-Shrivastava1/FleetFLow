import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    iconColor?: string;
    className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, iconColor = 'text-emerald-600 bg-emerald-50', className = '' }: MetricCardProps) {
    return (
        <div className={`h-full rounded-xl border border-gray-200 bg-white p-5 flex flex-col justify-between transition-all ${className}`}>
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                            {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                            <span className="text-gray-400">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}
