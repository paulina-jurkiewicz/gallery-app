import { Options, Vue }         from "vue-class-component";
import GLazyImage               from "@/components/LazyImage/index.vue";
import { IImage }               from "@/interfaces/IImage";
import { LocalStorage }         from "@/tools/LocalStorage";
import { Watch }                from "vue-property-decorator";

@Options( {
    props: {
        image: Object,
        isChecked: Boolean
    },
    components: {
        GLazyImage
    }
} )
export default class GGalleryImage extends Vue {
    image!: IImage;
    isChecked!: boolean;
    additionalElementsShown = false;
    isFavouriteChecked = false;
    localStorage: any;

    @Watch( 'isChecked' )
    onChangeFavouriteChecked() {
        this.isFavouriteChecked = this.isChecked;

        this.onChangeFavourite();
    }

    get favouriteIconFilledUrl() {
        return require('@/assets/heart-filled.svg');
    }

    get favouriteIconNotFilledUrl() {
        return require('@/assets/heart.svg');
    }

    get favouriteIconUrl() {
        return this.isFavouriteChecked ? this.favouriteIconFilledUrl: this.favouriteIconNotFilledUrl;
    }

    mounted() {
        this.localStorage = new LocalStorage();

        this.isFavouriteChecked = this.isChecked;
    }

    get description() {
        return this.image.altDescription;
    }

    get imageThumbUrl() {
        return this.image.urls.thumb;
    }

    get isAdditionalElementsShown() {
        return this.additionalElementsShown;
    }

    onMouseoverGalleryItem() {
        this.additionalElementsShown = true;
    }

    onMouseoutGalleryItem() {
        this.additionalElementsShown = false;
    }

    onChangeFavourite() {
        const favouriteImages = this.localStorage.getItemByName( 'favourite-images' ) || [];
        const favourites = favouriteImages.filter( ( application ) => application.id !== this.image.id );

        if ( this.isFavouriteChecked ) {
            favourites.push( { id: this.image.id } );
        }

        this.localStorage.setItem( 'favourite-images', favourites );

        this.$emit( 'change-favourite-images-list' );
    }
}