export interface ILocalStorage {
    setItem( key: string, item: object | string ): void;

    getItemByName( key: string ): boolean;

    removeItem( key: string ): void;
}
