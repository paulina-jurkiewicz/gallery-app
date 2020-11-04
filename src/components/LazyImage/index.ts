import { Options, Vue } from "vue-class-component";
import ImageSpinner from "@/components/ImageSpinner/index.vue";
import LazyLoad from "@/directives/LazyLoad";


@Options( {
    props: {
        source: String,
        alt: String,
    },
    directives: {
        lazyLoad: LazyLoad,
        focus: {
            mounted: function ( el ) {
                el.focus()
            },
        }
    },
    components: {
        ImageSpinner
    }
} )
export default class GLazyImage extends Vue {
    source!: any;
    alt!: any;
}
