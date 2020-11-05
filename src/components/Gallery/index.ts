import { Options, Vue }         from "vue-class-component";
import GGalleryImage            from "@/components/GalleryImage/index.vue";
import { IImage }               from "@/interfaces/IImage";
import { LocalStorage }         from "@/tools/LocalStorage";

@Options( {
    props: {
        items: Array
    },
    components: {
        GGalleryImage
    }
} )
export default class GGallery extends Vue {
    items!: IImage[];
    private favouriteImages: any = [];
    private localStorage: any;

    get galleryContainer() {
        return this.$refs.gallery as HTMLElement;
    }

    isChecked( id: string ) {
        return this.favouriteImagesCollection.has( id );
    }

    get favouriteImagesCollection() {
        return this.favouriteImages;
    }

    handleScroll() {
        const galleryHeight = this.galleryContainer.offsetHeight;

        if ( window.scrollY + window.innerHeight > galleryHeight - 100 ) {
            this.$emit( 'scroll-gallery-images' );
        }
    }

    mounted() {
        window.addEventListener( 'scroll', this.handleScroll );
    }

    destroyed() {
        window.removeEventListener( 'scroll', this.handleScroll );
    }

    onChangeFavouriteImagesList() {
        this.parseAppliedJobFromLocalStorage();

        this.$emit( 'change-favourite-images-list' );
    }

    created() {
        this.localStorage = new LocalStorage();

        this.parseAppliedJobFromLocalStorage();
    }

    parseAppliedJobFromLocalStorage() {
        this.favouriteImages = new Set( (this.localStorage.getItemByName( 'favourite-images' ) || []).map( ( image ) => image.id ) );
    }
}