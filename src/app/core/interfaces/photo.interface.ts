export interface Photo {
    id: number;
    author: string;
    favorite?: boolean;
}

export interface BasePhoto {
    id: number;
    author: string;
    author_url: string;
    filename: string;
    format: string;
    post_url: string;
    width: number;
    height: number;
}