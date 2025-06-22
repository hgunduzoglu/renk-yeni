import { PrismaService } from '../../common/prisma/prisma.service';
export declare class GalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
            albumId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: number | null;
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
            albumId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: number | null;
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
            albumId: number;
        }[];
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: number | null;
    }>;
}
