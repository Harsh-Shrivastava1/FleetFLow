export type UserRole = 'admin' | 'manager' | 'dispatcher' | 'safety_officer';

export interface User {
    email: string;
    role: UserRole;
    name?: string;
}

export const MOCK_USERS = [
    { email: "admin@gmail.com", password: "admin123", role: "admin" as UserRole },
    { email: "manager@gmail.com", password: "manager123", role: "manager" as UserRole },
    { email: "dispatcher@gmail.com", password: "dispatcher123", role: "dispatcher" as UserRole },
    { email: "safety@gmail.com", password: "safety123", role: "safety_officer" as UserRole }
];

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    admin: ['/dashboard', '/vehicles', '/trips', '/maintenance', '/expenses', '/drivers', '/analytics'],
    manager: ['/dashboard', '/vehicles', '/trips', '/maintenance', '/expenses', '/drivers', '/analytics'],
    dispatcher: ['/dashboard', '/trips', '/drivers', '/analytics'],
    safety_officer: ['/dashboard', '/vehicles', '/trips', '/maintenance', '/drivers'],
};

export const hasPermission = (role: UserRole, path: string): boolean => {
    return ROLE_PERMISSIONS[role]?.includes(path) || false;
};
