import { ILocalStorage } from '@/interfaces/ILocalStorage';

export class LocalStorage implements ILocalStorage {
    public setItem( key: string, item: object | string ) {
        if (  window.localStorage ) {
            window.localStorage.setItem( key, JSON.stringify( item ) );
        }
    }

    public getItemByName( key: string ) {
        if ( window.localStorage ) {
            return JSON.parse( window.localStorage.getItem( key )! );
        }
    }

    public removeItem( key: string ): void {
        if ( window.localStorage ) {
            window.localStorage.removeItem( key );
        }
    }
}
