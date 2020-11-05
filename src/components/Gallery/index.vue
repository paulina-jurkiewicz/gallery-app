<template>
    <section class="gallery" ref="gallery">
        <GGalleryImage v-for="(image,index) in items" :key="index" :image="image"
                       :isChecked="isChecked(image.id)"
                       @change-favourite-images-list="onChangeFavouriteImagesList"/>
    </section>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
