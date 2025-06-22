import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
        categoryId: number;
    })[]>;
    findOne(identifier: string): Promise<{
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
        categoryId: number;
    }>;
}
