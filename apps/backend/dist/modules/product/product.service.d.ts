import { PrismaService } from '../../common/prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(categorySlug?: string): Promise<({
        category: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        images: {
            id: number;
            createdAt: Date;
            url: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        images: {
            id: number;
            createdAt: Date;
            url: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
    }>;
    findBySlug(slug: string): Promise<{
        category: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        images: {
            id: number;
            createdAt: Date;
            url: string;
            productId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        price: import("@prisma/client/runtime/library").Decimal;
        categoryId: number;
    }>;
    private generateSlug;
}
