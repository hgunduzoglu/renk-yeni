import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<{
        email: string;
        id: number;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
