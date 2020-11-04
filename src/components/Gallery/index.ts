import { Options, Vue }         from "vue-class-component";
import GGalleryImage            from "@/components/GalleryImage/index.vue";
import { IImage }               from "@/interfaces/IImage";

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

    get galleryContainer() {
        return this.$refs.gallery as HTMLElement;
    }

    handleScroll() {
        const galleryHeight = this.galleryContainer.offsetHeight;

        if ( window.scrollY + window.innerHeight > galleryHeight - 100 ) {
            this.$emit( 'on-scroll-gallery' );
        }
    }

    mounted() {
        window.addEventListener( 'scroll', this.handleScroll );
    }

    destroyed() {
        window.removeEventListener( 'scroll', this.handleScroll );
    }
}