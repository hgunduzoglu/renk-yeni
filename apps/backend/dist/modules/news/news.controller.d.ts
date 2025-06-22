import { NewsService } from './news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
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
    findOne(identifier: string): Promise<{
        title: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        coverImage: string | null;
        slug: string;
        body: string;
        publishedAt: Date;
    }>;
}
