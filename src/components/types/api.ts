export interface NewsSource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsArticleSource {
    id?: string;
    name: string;
}

export interface NewsArticle {
    source: NewsArticleSource;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt?: string;
    content?: string;
}

export interface SourcesResponse {
    status?: string;
    sources?: NewsSource[];
}

export interface ArticlesResponse {
    status?: string;
    totalResults?: number;
    articles?: NewsArticle[];
}