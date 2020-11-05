import { Options, Vue }             from "vue-class-component";
import { GalleryService }           from "@/store/Gallery";
import GGallery                     from "@/components/Gallery/index.vue";
import { LocalStorage }             from "@/tools/LocalStorage";
import GFilters                     from "@/components/Filters/index.vue";

@Options( {
    components: {
        GGallery, GFilters
    }
} )
export default class Homepage extends Vue {
    localStorage: any;
    filterFavouriteChecked = false;

    get galleryLoading() {
        return GalleryService.loading;
    }

    get currentPage() {
        return GalleryService.currentPage;
    }

    get galleryImages() {
        return GalleryService.images;
    }

    get galleryFavourite() {
        return GalleryService.favouritesImages;
    }

    get galleryItems() {
        return this.favouriteChecked ? this.galleryFavourite : this.galleryImages;
    }

    get favouriteChecked() {
        return this.filterFavouriteChecked;
    }

    async created() {
        this.localStorage = new LocalStorage();

        this.fetchGalleryItems( 1, true );
        this.fetchFavouriteImagesList();
    }

    async fetchFavouriteImagesList() {
        const favouriteImages = ( this.localStorage.getItemByName( 'favourite-images' ) || [] ).map( ( image ) => image.id );

        await GalleryService.getFavourite( favouriteImages );
    }

    async fetchGalleryItems( page, clearList ) {
        const params = { page: page, perPage: 20, orderBy: 'latest' };

        if ( clearList ) {
            await GalleryService.clearImagesCollection();
        }

        await GalleryService.fetch( params );
    }

    onScrollGalleryImages() {
        if ( !this.favouriteChecked && !this.galleryLoading ) {
            this.fetchGalleryItems( this.currentPage + 1, false );
        }
    }

    onFilterFavouriteChange( filterFavouriteChecked ) {
        this.filterFavouriteChecked = filterFavouriteChecked;
    }

    onChangeFavouriteImagesList() {
        this.fetchFavouriteImagesList();
    }
}
