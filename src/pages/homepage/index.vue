<template>
    <section class="gallery__content">
       <GFilters @filter-favourite-change="onFilterFavouriteChange"/>

        <GGallery :items="galleryItems" @scroll-gallery-images="onScrollGalleryImages" @change-favourite-images-list="onChangeFavouriteImagesList"/>
    </section>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
