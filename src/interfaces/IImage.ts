export interface IImage {
    altDescription: string,
    createdAt: string,
    id: string,
    urls: {
        full: string,
        regular: string,
        thumb: string,
    }
}