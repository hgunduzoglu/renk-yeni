import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        parent: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(parentId?: number): Promise<({
        parent: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(identifier: string): Promise<{
        parent: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        products: ({
            images: {
                id: number;
                createdAt: Date;
                url: string;
                productId: number;
            }[];
        } & {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            createdAt: Date;
            updatedAt: Date;
            categoryId: number;
        })[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        parent: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        parent: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        _count: {
            products: number;
        };
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    moveProductToCategory(productId: string, categoryId: string): Promise<{
        category: {
            id: number;
            name: string;
            slug: string;
            description: string | null;
            coverImage: string | null;
            parentId: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: number;
            createdAt: Date;
            url: string;
            productId: number;
        }[];
    } & {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        coverImage: string | null;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
    }>;
}
