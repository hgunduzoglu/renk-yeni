import { PrismaService } from '../../common/prisma/prisma.service';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        body: string;
        publishedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        body: string;
        publishedAt: Date;
    }>;
    findBySlug(slug: string): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        body: string;
        publishedAt: Date;
    }>;
    private generateSlug;
}
