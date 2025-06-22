import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        parent: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        children: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        }[];
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    }>;
    findAll(parentId?: number): Promise<({
        parent: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        children: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        }[];
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    })[]>;
    findOne(id: number): Promise<{
        parent: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        children: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        }[];
        products: ({
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
        })[];
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    }>;
    findBySlug(slug: string): Promise<{
        parent: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        children: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        }[];
        products: ({
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
        })[];
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        parent: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        };
        children: {
            description: string | null;
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            coverImage: string | null;
            parentId: number | null;
            slug: string;
        }[];
        _count: {
            products: number;
        };
    } & {
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        parentId: number | null;
        slug: string;
    }>;
    moveProductToCategory(productId: number, categoryId: number): Promise<{
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
