import { Options, Vue }         from "vue-class-component";
import GLazyImage               from "@/components/LazyImage/index.vue";

@Options({
    props: {
        image: Object
    },
    components: {
        GLazyImage
    }
})
export default class GGalleryImage extends Vue {
    image!: any;

    get description() {
        return this.image.altDescription;
    }

    get imageRegularUrl() {
        return this.image.urls.regular;
    }
}