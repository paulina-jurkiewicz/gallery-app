import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store/index";
import { IImage } from "@/interfaces/IImage";
import { IGalleryResponse } from "@/interfaces/IGalleryResponse";
import apiGallery from "@/api/Gallery/apiGallery";

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
    public loading = false;

    private static unSerializeResponse( images ): IImage[] {
        return images.map( ( image ) => {
            return {
                altDescription: image.alt_description,
                createdAt: image.created_at,
                id: image.slug,
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
    @Action({ rawError: true })
    public async fetch(params: any) {
        this.SET_LOADING(true);

        const response: IGalleryResponse = await apiGallery().get(params);
        const { data } = response;

        this.SET_IMAGES( data );
        this.SET_CURRENT_PAGE( params.page );
        this.SET_TOTAL( params.perPage );
        this.SET_LOADING(false);
    }

    /**
     * @private
     * @param {IImage[]} images
     * @constructor
     */
    @Mutation
    private SET_IMAGES( images: IImage[] ) {
        this.images = this.images.concat(Gallery.unSerializeResponse( images ));
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
    } /**
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
