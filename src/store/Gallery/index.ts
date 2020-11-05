import { Action, getModule, Module, Mutation, VuexModule }  from "vuex-module-decorators";
import store                                                from "@/store/index";
import { IImage }                                           from "@/interfaces/IImage";
import { IGalleryResponse }                                 from "@/interfaces/IGalleryResponse";
import apiGallery                                           from "@/api/Gallery/apiGallery";

/**
 * @module Gallery
 * @class {Gallery}
 * @extends {VuexModule}
 * @dynamic
 * @namespaced
 */
@Module( {
    name: 'gallery',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    preserveState: false,
    store: store()
} )
class Gallery extends VuexModule {
    public total = 0;
    public currentPage = 1;
    public images: IImage[] = [];
    public favouritesImages: IImage[] = [];
    public loading = false;

    private static unSerializeCollectionResponse( images ): IImage[] {
        return images.map( ( image ) => {
            return {
                altDescription: image.alt_description,
                createdAt: image.created_at,
                id: image.id,
                urls: {
                    full: image.urls.full,
                    regular: image.urls.regular,
                    thumb: image.urls.thumb,
                },
            };
        } ) as IImage[];
    }

    /**
     * @public
     * @returns {Promise<void>}
     */
    @Action( { rawError: true } )
    public async fetch( params: any ) {
        this.SET_LOADING( true );

        const response: IGalleryResponse = await apiGallery().get( params );
        const { data } = response;

        this.SET_IMAGES( data );
        this.SET_CURRENT_PAGE( params.page );
        this.SET_TOTAL( params.perPage );
        this.SET_LOADING( false );
    }

    @Action( { rawError: true } )
    public clearImagesCollection() {
        this.SET_LOADING( true );
        this.CLEAR_IMAGES();
        this.SET_LOADING( false );
    }

    /**
     * @public
     * @returns {Promise<void>}
     */
    @Action( { rawError: true } )
    public async getFavourite( ids: Array<string> ) {
        this.SET_LOADING( true );
        this.CLEAR_FAVOURITES_IMAGES();

        const results: (IImage | undefined)[] = await Promise.all( ids.map( async ( id ): Promise<IImage | undefined> => {
            const response = await apiGallery().getOne( id );
            const { data } = response;

            return data;
        } ) );

        this.SET_FAVOURITES_IMAGES( results );
        this.SET_LOADING( false );
    }

    /**
     * @private
     * @param {IImage[]} images
     * @constructor
     */
    @Mutation
    private SET_IMAGES( images: IImage[] ) {
        this.images = this.images.concat( Gallery.unSerializeCollectionResponse( images ) );
    }

    /**
     * @private
     * @param {(IImage | undefined)[]} images
     * @constructor
     */
    @Mutation
    private SET_FAVOURITES_IMAGES( images: (IImage | undefined)[] ) {
        this.favouritesImages =  Gallery.unSerializeCollectionResponse( images ) ;
    }

    /**
     * @private
     * @constructor
     */
    @Mutation
    private CLEAR_FAVOURITES_IMAGES() {
        this.favouritesImages = [];
    }

    /**
     * @private
     * @constructor
     */
    @Mutation
    private CLEAR_IMAGES() {
        this.images = [];
    }

    /**
     * @private
     * @param {number} page
     * @constructor
     */
    @Mutation
    private SET_CURRENT_PAGE( page: number ) {
        this.currentPage = page;
    }

    /**
     * @private
     * @param {number} total
     * @constructor
     */
    @Mutation
    private SET_TOTAL( total: number ) {
        this.total = total;
    }

    /**
     * @private
     * @param {boolean} loading
     * @constructor
     */
    @Mutation
    private SET_LOADING( loading: boolean ) {
        this.loading = loading;
    }
}

/**
 * @type {Gallery}
 * @public
 */
export const GalleryService = getModule( Gallery );
