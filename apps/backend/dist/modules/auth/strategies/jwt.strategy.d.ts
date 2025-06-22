import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: any): Promise<{
        email: string;
        id: number;
        name: string;
    }>;
}
export {};
