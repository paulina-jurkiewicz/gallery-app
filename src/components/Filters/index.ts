import { Options, Vue }         from "vue-class-component";

@Options( {
    components: {
    }
} )
export default class GFilters extends Vue {
    isFilterFavouriteChecked = false;

    onChangeFilterFavourite() {
        this.$emit('filter-favourite-change', this.isFilterFavouriteChecked);
    }

    get favouriteIconFilledUrl() {
        return require('@/assets/heart-filled.svg');
    }

    get favouriteIconNotFilledUrl() {
        return require('@/assets/heart.svg');
    }

    get favouriteIconUrl() {
        return this.isFilterFavouriteChecked ? this.favouriteIconFilledUrl: this.favouriteIconNotFilledUrl;
    }
}