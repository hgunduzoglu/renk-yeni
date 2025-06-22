import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
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
