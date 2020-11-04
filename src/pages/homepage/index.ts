import { Options, Vue } from "vue-class-component";
import { GalleryService } from "@/store/Gallery";
import GGalleryImage from "@/components/GalleryImage/index.vue";
import GGallery from "@/components/Gallery/index.vue";

@Options( {
    components: {
        GGallery
    }
} )
export default class Homepage extends Vue {
    get totalItems() {
        return GalleryService.total;
    }

    get galleryLoading() {
        return GalleryService.loading;
    }

    get currentPage() {
        return GalleryService.currentPage;
    }

    get galleryItems() {
        console.log(GalleryService.images, 'GalleryService.images')
        return GalleryService.images;
    }

    async mounted() {
        const params = { page: 1, perPage: 20, orderBy: 'latest' };

        await GalleryService.fetch(params);
    }

    onScrollGallery(){
        console.log('scroll')

        this.fetchGalleryItemsOnScroll();
    }

    async fetchGalleryItemsOnScroll() {
        if (!this.galleryLoading) {
            const params = { page: this.currentPage + 1, perPage: 20, orderBy: 'latest' };

            await GalleryService.fetch( params );
        }
    }
}
