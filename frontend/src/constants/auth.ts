export type UserRole = 'manager' | 'dispatcher' | 'safety' | 'finance';

export interface User {
    email: string;
    role: UserRole;
    name?: string;
}

export const MOCK_USERS = [
    { email: "manager@gmail.com", password: "manager123", role: "manager" as UserRole },
    { email: "dispatcher@gmail.com", password: "dispatcher123", role: "dispatcher" as UserRole },
    { email: "safety@gmail.com", password: "safety123", role: "safety" as UserRole },
    { email: "finance@gmail.com", password: "finance123", role: "finance" as UserRole }
];

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    manager: ['/dashboard', '/vehicles', '/trips', '/maintenance', '/expenses', '/drivers', '/analytics'],
    dispatcher: ['/dashboard', '/trips', '/drivers', '/analytics'],
    safety: ['/dashboard', '/vehicles', '/trips', '/maintenance', '/drivers'],
    finance: ['/dashboard', '/expenses', '/analytics', '/vehicles'],
};

export const hasPermission = (role: UserRole, path: string): boolean => {
    return ROLE_PERMISSIONS[role]?.includes(path) || false;
};
