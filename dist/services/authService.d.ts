export declare class AuthService {
    private userRepository;
    constructor();
    login(email: string, password: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        token: string;
    }>;
    registerAdmin(email: string, password: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        token: string;
    }>;
}
//# sourceMappingURL=authService.d.ts.map