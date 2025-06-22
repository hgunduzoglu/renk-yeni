import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
