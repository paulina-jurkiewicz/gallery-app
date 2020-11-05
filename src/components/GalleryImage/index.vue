<template>
    <div class="gallery__item" @mouseover="onMouseoverGalleryItem" @mouseout="onMouseoutGalleryItem">
        <GLazyImage :alt="description" :source="imageThumbUrl"/>

        <div class="item__favourite" v-bind:class="{ 'is-shown': isAdditionalElementsShown }">
            <input :id="'favourite-image-' + image.id" :name="'favourite-image-' + image.id"
                   @change.prevent="onChangeFavourite"
                   autocomplete="off"
                   type="checkbox"
                   v-model="isFavouriteChecked" />
            <label :for="'favourite-image-' + image.id">
                <img :src="favouriteIconUrl" alt="favourite" />
            </label>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
